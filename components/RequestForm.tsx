"use client";

import { useState } from "react";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "ok"; message: string }
  | { state: "err"; message: string };

export default function RequestForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;
    setStatus({ state: "submitting" });

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      organization: String(data.get("organization") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      using: String(data.get("using") ?? "").trim(),
      // honeypot — must stay empty
      website: String(data.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && body.ok) {
        setStatus({
          state: "ok",
          message:
            body.message ??
            "You're on the list. We'll reach out from almonry.app when your invite is ready.",
        });
        form.reset();
      } else {
        setStatus({
          state: "err",
          message:
            body.message ??
            "That didn't go through. Check your details and send it again.",
        });
      }
    } catch {
      setStatus({
        state: "err",
        message:
          "The request couldn't reach us — your connection dropped. Try once more.",
      });
    }
  }

  if (status.state === "ok") {
    return (
      <p className="form-status ok" role="status" style={{ marginTop: 38 }}>
        {status.message}
      </p>
    );
  }

  return (
    <form className="request-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="rf-name">Name</label>
        <input id="rf-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="rf-org">Organization</label>
        <input
          id="rf-org"
          name="organization"
          type="text"
          autoComplete="organization"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="rf-email">Email</label>
        <input
          id="rf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="rf-using">What are you using now? (optional)</label>
        <textarea
          id="rf-using"
          name="using"
          placeholder="Spreadsheets, QuickBooks, another donor tool, nothing yet…"
        />
      </div>

      {/* honeypot: hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="rf-website">Website</label>
        <input id="rf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="actions">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={status.state === "submitting"}
        >
          {status.state === "submitting" ? "Sending…" : "Request early access"}
        </button>
        {status.state === "err" && (
          <p className="form-status err" role="alert">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
