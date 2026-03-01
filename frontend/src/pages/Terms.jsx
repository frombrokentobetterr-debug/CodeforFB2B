const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .terms { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; color: #2a2420; }
  .terms-hero { background: #2a2420; padding: 100px 24px 60px; text-align: center; }
  .terms-hero .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #7a9e87; margin-bottom: 14px; }
  .terms-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 4vw, 50px); font-weight: 300; color: #f4ede3; margin-bottom: 10px; }
  .terms-hero .dt { font-size: 11px; color: #8a7d74; letter-spacing: 0.1em; }

  .terms-body { max-width: 680px; margin: 0 auto; padding: 64px 24px 80px; }
  .terms-intro { font-family: 'Cormorant Garamond', serif; font-size: 19px; font-weight: 300; line-height: 1.8; color: #4a4038; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid #ede3d8; }

  .t-s { margin-bottom: 40px; padding-bottom: 40px; border-bottom: 1px solid #ede3d8; }
  .t-s:last-child { border-bottom: none; margin-bottom: 0; }
  .t-s .snum { font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase; color: #c4623a; margin-bottom: 6px; }
  .t-s h2 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; margin-bottom: 14px; }
  .t-s p { font-size: 13px; line-height: 1.9; color: #5a504a; margin-bottom: 10px; }
  .t-s ul { list-style: none; padding: 0; }
  .t-s ul li { font-size: 13px; line-height: 1.8; color: #5a504a; padding: 6px 0 6px 16px; position: relative; border-bottom: 1px solid #f4ede3; }
  .t-s ul li::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 5px; height: 5px; border-radius: 50%; background: #7a9e87; }
  .t-s a { color: #7a9e87; text-decoration: none; }

  .warn { background: #fff8f5; border-left: 3px solid #c4623a; padding: 16px 20px; margin: 12px 0; font-size: 13px; line-height: 1.7; color: #4a4038; }
  .warn strong { color: #c4623a; font-weight: 500; }

  .back { display: inline-block; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #8a7d74; text-decoration: none; margin-bottom: 40px; }
  .back:hover { color: #c4623a; }
`;

const secs = [
  { n:"01", h:"Acceptance of Terms", body: <p>By using From Broken to Better you agree to these terms. They are governed by the laws of India. If you do not agree, please do not use the platform.</p> },
  { n:"02", h:"Account Responsibility", body: <ul>{["Must be at least 18 years old","Provide accurate information on registration","Keep credentials confidential","Notify us of any unauthorised account use","One account per person"].map(i=><li key={i}>{i}</li>)}</ul> },
  { n:"03", h:"Acceptable Use", body: <ul>{["Do not harass or harm other users or practitioners","Do not share false information about yourself","No commercial solicitation without written consent","No attempts to access other users' data","No abusive, discriminatory, or illegal content"].map(i=><li key={i}>{i}</li>)}</ul> },
  { n:"04", h:"Not Medical Advice", body: <><div className="warn"><strong>Important:</strong> This is a wellness platform, not a medical service. Nothing here constitutes clinical or psychiatric advice.</div><p>If you are in crisis, contact a qualified healthcare professional or crisis helpline immediately.</p></> },
  { n:"05", h:"Practitioner Relationship", body: <p>Practitioners are independent professionals. We verify credentials but are not responsible for their advice. Any private session agreement is between you and the practitioner.</p> },
  { n:"06", h:"Payments & Refunds", body: <ul>{["Cancel sessions 24+ hours in advance for a full refund","Late cancellations may incur a fee","Subscription fees are non-refundable once a billing cycle starts","Raise disputes within 7 days at support@frombrokentobetter.com"].map(i=><li key={i}>{i}</li>)}</ul> },
  { n:"07", h:"Intellectual Property", body: <p>All platform content is owned by From Broken to Better and protected under Indian IP law. Do not reproduce or redistribute without written permission.</p> },
  { n:"08", h:"Termination", body: <p>We may suspend accounts that violate these terms. You may delete your account anytime from settings. Data handling on termination follows our Privacy Policy.</p> },
  { n:"09", h:"Governing Law", body: <p>These terms are governed by Indian law. Disputes fall under the exclusive jurisdiction of Indian courts. Questions? <a href="mailto:hello@frombrokentobetter.com">hello@frombrokentobetter.com</a></p> },
];

export default function Terms() {
  return (
    <>
      <style>{styles}</style>
      <div className="terms">
        <section className="terms-hero">
          <div className="eye">Legal</div>
          <h1>Terms of Service</h1>
          <div className="dt">Effective March 1, 2026 · Last Updated March 1, 2026</div>
        </section>
        <div className="terms-body">
          <a href="/" className="back">← Back to Home</a>
          <p className="terms-intro">These terms exist to keep the platform safe and fair for everyone. Written in plain language — no legalese.</p>
          {secs.map(s => (
            <div className="t-s" key={s.n}>
              <div className="snum">Section {s.n}</div>
              <h2>{s.h}</h2>
              {s.body}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
