import { Helmet } from "react-helmet-async";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .about { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; color: #2a2420; }

  /* HERO */
  .about-hero { background: #1a1612; padding: 110px 24px 80px; text-align: center; position: relative; overflow: hidden; }
  .about-hero::before { content:''; position:absolute; width:480px; height:480px; background:radial-gradient(circle, rgba(196,98,58,0.08) 0%, transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); pointer-events:none; }
  .about-hero .eye { font-size:10px; letter-spacing:0.4em; text-transform:uppercase; color:#7a9e87; margin-bottom:18px; position:relative; }
  .about-hero h1 { font-family:'Cormorant Garamond',serif; font-size:clamp(30px,5vw,58px); font-weight:300; color:#f4ede3; line-height:1.12; max-width:680px; margin:0 auto 18px; position:relative; }
  .about-hero h1 em { font-style:italic; color:#c4623a; }
  .about-hero p { font-size:13px; color:#8a7d74; max-width:380px; margin:0 auto; line-height:1.75; position:relative; }

  /* NUMBERS BAR */
  .numbers-bar { background:#2a2420; padding:52px 24px; }
  .numbers-inner { max-width:860px; margin:0 auto; }
  .numbers-inner .eye { font-size:9px; letter-spacing:0.4em; text-transform:uppercase; color:#7a9e87; margin-bottom:28px; text-align:center; }
  .numbers-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:#3a3028; }
  .num-item { background:#2a2420; padding:24px 16px; text-align:center; }
  .num-item .stat { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,2.5vw,32px); font-weight:300; color:#c4623a; line-height:1; margin-bottom:8px; }
  .num-item .stat-l { font-size:10px; color:#6a5e58; line-height:1.55; }

  /* ESSAY */
  .about-essay { max-width:640px; margin:0 auto; padding:72px 24px 0; }

  .essay-block { margin-bottom:56px; }
  .essay-block .chapter { font-size:9px; letter-spacing:0.45em; text-transform:uppercase; color:#c4623a; margin-bottom:14px; }
  .essay-block h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,3vw,32px); font-weight:300; line-height:1.2; margin-bottom:18px; color:#1a1612; }
  .essay-block h2 em { font-style:italic; color:#7a9e87; }
  .essay-block p { font-size:14px; line-height:1.95; color:#3a3028; margin-bottom:14px; }
  .essay-block p em { font-style:italic; font-family:'Cormorant Garamond',serif; font-size:17px; color:#4a4038; }
  .essay-block p strong { font-weight:400; color:#1a1612; }

  .pull-quote { border-left:3px solid #c4623a; padding:2px 0 2px 24px; margin:28px 0; }
  .pull-quote p { font-family:'Cormorant Garamond',serif; font-size:clamp(17px,2vw,22px); font-weight:300; font-style:italic; line-height:1.6; color:#2a2420; margin:0; }

  .rule { border:none; border-top:1px solid #e0d8ce; margin:0; }

  /* CLOSING */
  .about-close { max-width:640px; margin:0 auto; padding:56px 24px 0; }
  .about-close .chapter { font-size:9px; letter-spacing:0.45em; text-transform:uppercase; color:#c4623a; margin-bottom:14px; }
  .about-close h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,3vw,32px); font-weight:300; line-height:1.2; margin-bottom:18px; color:#1a1612; }
  .about-close h2 em { font-style:italic; color:#7a9e87; }
  .about-close p { font-size:14px; line-height:1.95; color:#3a3028; margin-bottom:14px; }
  .about-close p em { font-style:italic; font-family:'Cormorant Garamond',serif; font-size:17px; color:#4a4038; }
  .about-close p strong { font-weight:400; color:#1a1612; }

  /* CTA */
  .about-cta { background:#1a1612; padding:72px 24px; text-align:center; margin-top:72px; }
  .about-cta h2 { font-family:'Cormorant Garamond',serif; font-size:clamp(26px,4vw,46px); font-weight:300; font-style:italic; color:#f4ede3; margin-bottom:8px; }
  .about-cta h2 span { color:#c4623a; }
  .about-cta .cta-sub { font-size:11px; letter-spacing:0.25em; text-transform:uppercase; color:#6a5e58; margin-bottom:32px; }
  .about-cta a { display:inline-block; background:#c4623a; color:white; font-family:'Jost',sans-serif; font-size:11px; letter-spacing:0.2em; text-transform:uppercase; padding:13px 40px; border-radius:40px; text-decoration:none; transition:background 0.2s; }
  .about-cta a:hover { background:#9e4828; }

  @media (max-width:640px) { .numbers-grid { grid-template-columns:repeat(3,1fr); } }
  @media (max-width:380px) { .numbers-grid { grid-template-columns:repeat(2,1fr); } }
`;

export default function About() {
  return (
    <>
      <Helmet>
        <title>Our Story | From Broken To Better</title>
        <meta name="description" content="From elders arranging marriages to algorithms deciding love — separation in India is now an epidemic no app addresses. This is what comes after." />
        <link rel="canonical" href="https://frombrokentobetter.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frombrokentobetter.com/about" />
        <meta property="og:title" content="Our Story | From Broken To Better" />
        <meta property="og:description" content="From elders arranging marriages to algorithms deciding love — separation in India is now an epidemic no app addresses. This is what comes after." />
        <meta property="og:image" content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="From Broken To Better" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://frombrokentobetter.com/about" />
        <meta name="twitter:title" content="Our Story | From Broken To Better" />
        <meta name="twitter:description" content="From elders arranging marriages to algorithms deciding love — separation in India is now an epidemic no app addresses. This is what comes after." />
        <meta name="twitter:image" content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>
      <style>{styles}</style>
      <div className="about">

        {/* HERO */}
        <section className="about-hero">
          <div className="eye">Our Story</div>
          <h1>This is not a dating app.<br />This is what comes <em>after.</em></h1>
          <p>A story about how we ended up here — and why someone had to build this.</p>
        </section>

        {/* NUMBERS BAR — between hero and story */}
        <section className="numbers-bar">
          <div className="numbers-inner">
            <div className="eye">Separation in India — The Numbers</div>
            <div className="numbers-grid">
              {[
                { s: "13.6L+", l: "Divorce petitions filed annually — tripled in a decade" },
                { s: "63%",    l: "Urban Indians who experienced a significant separation before 35" },
                { s: "2.4Cr", l: "Single-person households — fastest growing household type" },
                { s: "78%",   l: "Had no structured support during or after separation" },
                { s: "4 in 10", l: "Living separately without formal divorce — the invisible separations" },
                { s: "1 in 3", l: "Had nowhere to go — not family, not friends, not a professional" },
              ].map(n => (
                <div className="num-item" key={n.s}>
                  <div className="stat">{n.s}</div>
                  <div className="stat-l">{n.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ESSAY */}
        <div className="about-essay">

          <div className="essay-block">
            <div className="chapter">Chapter One</div>
            <h2>The elders decided.<br />Then the family.<br /><em>Now the algorithm.</em></h2>
            <p>
              For generations, unions in India were not left to the two people involved. Someone else decided. The priest, the maulvi, the granthi, the pastor — every faith had its version. Families consulted. Communities approved. The architecture differed by religion and region, but the underlying idea was the same: <strong>marriage was built for permanence.</strong>
            </p>
            <p>
              Then the apps arrived. Tinder, Bumble, Hinge, TrulyMadly, Aisle — an industry built on the premise that love could be filtered and served like a product recommendation. You could scroll through fifty people in the time it once took to finish a cup of chai.
            </p>
            <p>
              And Instagram became the new drawing room. We stopped being present in our homes and started performing in our feeds. We curated our highlight reels while our real lives quietly frayed. <em>Connection became faster, wider, and infinitely more disposable.</em>
            </p>

            <div className="pull-quote">
              <p>"We are more emotionally invested in the people we follow online than in the people sitting across the dinner table."</p>
            </div>
          </div>

          <div className="essay-block">
            <div className="chapter">Chapter Two</div>
            <h2>Some left quickly.<br />Some left slowly.<br /><em>Most were surprised either way.</em></h2>
            <p>
              Separation doesn't always come with a dramatic ending. Sometimes it's a slow drift — two people becoming strangers in the same house. Sometimes it's sudden — a message, a morning when everything is different.
            </p>
            <p>
              Either way, the grief is the same. You don't just lose a person. You lose a version of yourself — the partner, the half of something whole. You lose the future you were quietly building. The apartment. The trip. The way you imagined Tuesday mornings.
            </p>
            <p><em>You lose the ordinary things the most.</em></p>
          </div>

        </div>

        <hr className="rule" />

        {/* CLOSING */}
        <div className="about-close">
          <div className="chapter">Why We're Here</div>
          <h2>Not to fix you.<br />Not to replace what you lost.<br /><em>Just to walk with you through it.</em></h2>
          <p>
            The dating apps are already waiting. The world will tell you to move on, get back out there, swipe again. And maybe one day you will. Maybe you'll go back. Maybe you'll stay single. Maybe you'll find something unexpected.
          </p>
          <p>
            But none of that is possible if you skip the grief. It has to be walked — not performed, not optimised, not outsourced to a chatbot at midnight. <strong>Walked.</strong>
          </p>
          <p>
            From Broken to Better was built because separation is one of the hardest things a human being goes through — and the world built a thousand apps for before it, and almost nothing for after.
          </p>
          <p><em>We are the after.</em></p>
          <p>
            Move on, move back, move sideways — we don't decide that. But however you move, move through the grief first. We'll be here for that part.
          </p>
        </div>

        {/* CTA */}
        <section className="about-cta">
          <h2>Walk your grief. <span>Rebuild.</span></h2>
          <div className="cta-sub">When you're ready</div>
          <a href="/register">Begin Your Journey →</a>
        </section>

      </div>
    </>
  );
}
