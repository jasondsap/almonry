import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Early-access request handler. Sends a notification to NOTIFY_EMAIL via Resend
 * and, when possible, a confirmation back to the requester. No database — email
 * is the whole record for v1.
 *
 * Resend pattern reused from the Advancement Platform: lazy client, and a
 * `from` that falls back to RESEND_FROM_FALLBACK (then resend's onboarding
 * sender) until almonry.app is verified in Resend.
 */

let cached: Resend | null = null;
function client(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  if (!cached) cached = new Resend(key);
  return cached;
}

function fromAddress(): string {
  const fallback = process.env.RESEND_FROM_FALLBACK || "onboarding@resend.dev";
  return `Almonry <${fallback}>`;
}

// Basic in-memory rate limit. Best-effort only — serverless instances don't
// share memory — but it blunts a single source hammering one warm instance.
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't read that request. Send it again." },
      { status: 400 }
    );
  }

  // Honeypot: real people leave this empty. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, message: "You're on the list." });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "That's a few too many tries in a row. Give it a minute." },
      { status: 429 }
    );
  }

  const name = String(body.name ?? "").trim();
  const organization = String(body.organization ?? "").trim();
  const email = String(body.email ?? "").trim();
  const using = String(body.using ?? "").trim();

  const problems: string[] = [];
  if (name.length < 2) problems.push("a name");
  if (organization.length < 2) problems.push("your organization");
  if (!EMAIL_RE.test(email)) problems.push("a valid email");

  if (problems.length > 0) {
    return NextResponse.json(
      { ok: false, message: `We still need ${problems.join(", ")}.` },
      { status: 422 }
    );
  }

  const notify = process.env.NOTIFY_EMAIL;
  if (!notify) {
    // Misconfiguration — say so plainly rather than swallow the request.
    console.error("NOTIFY_EMAIL is not set; cannot route access request.");
    return NextResponse.json(
      { ok: false, message: "Our request inbox isn't wired up yet. Email hello@made180.com instead." },
      { status: 500 }
    );
  }

  try {
    const resend = client();

    const summary = `
      <p><b>Name:</b> ${escapeHtml(name)}</p>
      <p><b>Organization:</b> ${escapeHtml(organization)}</p>
      <p><b>Email:</b> ${escapeHtml(email)}</p>
      <p><b>Using now:</b> ${using ? escapeHtml(using) : "—"}</p>
    `;

    const notifyResult = await resend.emails.send({
      from: fromAddress(),
      to: notify,
      replyTo: email,
      subject: `Almonry early access — ${organization}`,
      html: `<h2>New early-access request</h2>${summary}`,
    });
    if (notifyResult.error) {
      throw new Error(notifyResult.error.message);
    }

    // Confirmation to the requester — best effort; don't fail the request if
    // this one bounces (e.g. before almonry.app is a verified sender).
    try {
      await resend.emails.send({
        from: fromAddress(),
        to: email,
        subject: "We received your request — Almonry",
        html: `
          <p>${escapeHtml(name.split(" ")[0] || name)},</p>
          <p>Your request for early access to Almonry is in. We're onboarding
          organizations a few at a time — we'll reach out from almonry.app when
          your invite is ready.</p>
          <p>Where generosity is kept.<br/>— Almonry</p>
        `,
      });
    } catch (e) {
      console.warn("Confirmation email failed (non-fatal):", e);
    }

    return NextResponse.json({
      ok: true,
      message:
        "You're on the list. We're onboarding organizations a few at a time — we'll reach out from almonry.app when your invite is ready.",
    });
  } catch (e) {
    console.error("request-access send failed:", e);
    return NextResponse.json(
      { ok: false, message: "The email didn't go through on our end. Try again in a moment." },
      { status: 502 }
    );
  }
}
