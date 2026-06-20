import Reveal from "@/components/Reveal";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <>
      <Reveal />

      <header>
        <div className="wrap">
          <nav>
            <a className="mark" href="#">
              {/* Ledger Arch: arch formed by two open pages + keystone */}
              <svg width="36" height="38" viewBox="0 0 36 38" fill="none" aria-hidden="true">
                <path d="M18 8C13 4 7 4 4 6v26c3-2 9-2 14 2" stroke="#6E2A2A" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M18 8c5-4 11-4 14-2v26c-3-2-9-2-14 2" stroke="#A9854B" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M18 8v26" stroke="#2B2620" strokeWidth="1.3" opacity=".5" />
                <circle cx="18" cy="6" r="2.4" fill="#A9854B" />
              </svg>
              <span className="name">Almonry</span>
            </a>
            <div className="links">
              <a href="#what">What it does</a>
              <a href="#why">Why Almonry</a>
              <a href="#story">The name</a>
              <a className="btn btn-primary navcta" href="#request">
                Request access
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="wrap">
            <div className="reveal in">
              <p className="eyebrow">Stewardship software</p>
              <h1>
                Where generosity
                <br />
                is <em>kept</em>.
              </h1>
              <p className="subhead">
                <b>Donor management, online giving, and donor stewardship</b> — built for
                community nonprofits, not enterprise budgets.
              </p>
              <p className="lede">
                Receive every gift. Remember every donor. Keep faith with both.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary" href="#request">
                  Request early access
                </a>
                <a className="btn btn-ghost" href="#what">
                  See what it does
                </a>
              </div>
              <p className="hero-note">
                Online giving · Donor records · Automatic receipts · <b>No per-seat fees</b>
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY STRIP */}
        <div className="cat">
          <div className="wrap">
            <span>Built for</span>
            <b>recovery houses</b>
            <span className="dot"></span>
            <b>foster networks</b>
            <span className="dot"></span>
            <b>community ministries</b>
            <span className="dot"></span>
            <b>rescue missions</b>
            <span className="dot"></span>
            <b>local foundations</b>
          </div>
        </div>

        {/* ORIGIN */}
        <section className="origin" id="story">
          <div className="wrap">
            <div className="glyph reveal">❦</div>
            <p className="pron reveal">
              al·mon·ry · <em>the place where gifts were gathered and given</em>
            </p>
            <p className="drop reveal">
              Eight hundred years ago, every abbey and great house kept an <em>almonry</em> —
              the room where gifts were gathered and given to those in need. The person who
              kept it, the <em>almoner</em>, held a single trust: to receive generosity on
              behalf of others, record every gift faithfully, and see it reach the people it
              was meant for.
            </p>
            <span className="turn reveal">The tools have changed. The trust hasn&apos;t.</span>
            <p className="reveal">
              Almonry is that keeping place, rebuilt for the nonprofits doing real work on
              small budgets — the ones who deserve professional stewardship tools without
              enterprise complexity.
            </p>
          </div>
        </section>

        {/* WHY / PILLARS */}
        <section className="pillars" id="why">
          <div className="wrap">
            <div className="section-head reveal">
              <p className="eyebrow">The almoner&apos;s three duties</p>
              <h2>Faithful, warm, and within reach.</h2>
            </div>
            <div className="pillar-grid reveal">
              <div className="pillar">
                <p className="lbl">Faithful</p>
                <div className="ico">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 5a2 2 0 012-2h9l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Nothing slips</h3>
                <p>
                  Gifts log themselves the moment they&apos;re given. Receipts go out correct
                  the first time, with the right language and your EIN. The accountability the
                  almoner always owed.
                </p>
              </div>
              <div className="pillar">
                <p className="lbl">Warm</p>
                <div className="ico">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0112 7a4.5 4.5 0 017 3.5C19 15.65 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Built around people</h3>
                <p>
                  Donors are relationships, not rows. See a person&apos;s whole history — their
                  gifts, their household, what they care about — and reach them like you
                  actually know them.
                </p>
              </div>
              <div className="pillar">
                <p className="lbl">Within reach</p>
                <div className="ico">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Priced for missions</h3>
                <p>
                  No per-seat tax. No implementation fee. No consultant required to turn it on.
                  The almonry served the community it was part of — not shareholders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT DOES */}
        <section className="does" id="what">
          <div className="wrap">
            <div className="section-head reveal">
              <p className="eyebrow">What it does</p>
              <h2>Receive. Record. Renew.</h2>
            </div>

            <div className="does-row reveal">
              <div className="copy">
                <h3>Donations that log themselves</h3>
                <p>
                  Put a giving page on your site for one-time and monthly gifts. The moment
                  someone gives, the donation is recorded, the donor is matched or created, and
                  a tax receipt is on its way — before you&apos;ve even refreshed the screen.
                </p>
              </div>
              <div className="vis receipt">
                <div className="rh">
                  <span className="org">Riverside Recovery</span>
                  <span className="no">RR-2026-000412</span>
                </div>
                <div className="line">
                  <span>Date of gift</span>
                  <b>June 19, 2026</b>
                </div>
                <div className="line">
                  <span>Designation</span>
                  <b>Housing Fund</b>
                </div>
                <div className="line">
                  <span>Type</span>
                  <b>Monthly · recurring</b>
                </div>
                <div className="amt">$50.00</div>
                <div className="seal">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#2F4032" strokeWidth="1.8" />
                    <path d="M8 12l2.5 2.5L16 9" stroke="#2F4032" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  RECEIPT SENT · IRS-COMPLIANT
                </div>
              </div>
            </div>

            <div className="does-row flip reveal">
              <div className="copy">
                <h3>A ledger that knows who&apos;s slipping away</h3>
                <p>
                  Every donor, every gift, every household and pledge in one place. Almonry
                  surfaces the donors who gave last year but not this one — the lapse reports
                  fundraisers live by — so you can reach them before they&apos;re gone for good.
                </p>
              </div>
              <div className="vis ledger">
                <div className="lrow head">
                  <span>Donor</span>
                  <span>Last gift</span>
                  <span>Status</span>
                </div>
                <div className="lrow">
                  <b>Margaret Ellison</b>
                  <span>This year</span>
                  <span className="tag">Active</span>
                </div>
                <div className="lrow">
                  <b>The Cordell Fund</b>
                  <span>This year</span>
                  <span className="tag">Active</span>
                </div>
                <div className="lrow">
                  <b>James &amp; Ruth Park</b>
                  <span>Last year</span>
                  <span className="tag lapsed">Lapsed</span>
                </div>
                <div className="lrow">
                  <b>Hillside Church</b>
                  <span>Last year</span>
                  <span className="tag lapsed">Lapsed</span>
                </div>
              </div>
            </div>

            <div className="does-row reveal">
              <div className="copy">
                <h3>Campaigns you can actually watch come together</h3>
                <p>
                  Set a goal, point gifts at the right fund and appeal, and see the total climb
                  in real time. The structure underneath is the same one the big platforms use
                  — funds, campaigns, appeals — without the price tag or the training manual.
                </p>
              </div>
              <div className="vis">
                <div className="campaign-label">Winter Shelter Drive</div>
                <div className="campaign-amt">
                  $31,800 <span>of $40,000</span>
                </div>
                <div className="campaign-bar">
                  <div className="campaign-bar-fill"></div>
                </div>
                <div className="campaign-meta">
                  <span>248 donors</span>
                  <span>79% to goal · 12 days left</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="forwhom">
          <div className="wrap">
            <p className="eyebrow eyebrow-who">Who it&apos;s for</p>
            <h2>If you&apos;re running a real mission on a small budget, this was built for you.</h2>
            <div className="who">
              <span>Recovery organizations</span>
              <span>Foster &amp; family services</span>
              <span>Community ministries</span>
              <span>Rescue missions</span>
              <span>Reentry programs</span>
              <span>Community action agencies</span>
              <span>Local foundations</span>
              <span>Volunteer organizations</span>
            </div>
            <p className="sub">
              Most of them aren&apos;t shopping enterprise software. They&apos;re on
              spreadsheets, QuickBooks, or nothing at all — doing heroic work without the tools
              to steward the people who fund it. Almonry is for them.
            </p>
          </div>
        </section>

        {/* PLEDGE / REQUEST */}
        <section className="pledge" id="request">
          <div className="wrap">
            <p className="eyebrow">Why we built it</p>
            <h2>
              Professional donor stewardship shouldn&apos;t be a privilege of the{" "}
              <em>well-funded</em>.
            </h2>
            <p className="sub">
              Generosity in. Stewardship kept. Mission funded. That&apos;s the whole job — and
              now it&apos;s within reach.
            </p>
            <RequestForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot">
            <a className="mark" href="#">
              <svg width="30" height="32" viewBox="0 0 36 38" fill="none" aria-hidden="true">
                <path d="M18 8C13 4 7 4 4 6v26c3-2 9-2 14 2" stroke="#6E2A2A" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M18 8c5-4 11-4 14-2v26c-3-2-9-2-14 2" stroke="#A9854B" strokeWidth="2.2" strokeLinejoin="round" />
                <circle cx="18" cy="6" r="2.4" fill="#A9854B" />
              </svg>
              <span className="name">Almonry</span>
            </a>
            <span className="tag">Where generosity is kept.</span>
            <span className="by">
              A product of <a href="#">MADe180 Digital Solutions</a> · almonry.app
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
