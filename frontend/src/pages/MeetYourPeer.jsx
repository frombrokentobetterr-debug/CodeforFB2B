import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .peer { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; color: #2a2420; }

  .peer-hero { padding: 100px 24px 60px; text-align: center; }
  .peer-hero .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #7a9e87; margin-bottom: 18px; }
  .peer-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(30px, 5vw, 54px); font-weight: 300; line-height: 1.15; margin-bottom: 18px; }
  .peer-hero h1 em { font-style: italic; color: #c4623a; }
  .peer-hero p { font-size: 14px; color: #8a7d74; max-width: 420px; margin: 0 auto; line-height: 1.75; }

  .peer-body { max-width: 800px; margin: 0 auto; padding: 48px 24px 64px; }

  .steps { display: grid; grid-template-columns: repeat(4,1fr); gap: 3px; background: #ede3d8; margin-bottom: 64px; }
  .step { background: #fff; padding: 28px 20px; }
  .step .sn { font-family: 'Cormorant Garamond', serif; font-size: 40px; color: #f4ede3; line-height: 1; margin-bottom: 8px; }
  .step h4 { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 400; margin-bottom: 8px; }
  .step p { font-size: 12px; line-height: 1.7; color: #8a7d74; }

  /* STORY FORM */
  .story-section { background: #2a2420; padding: 64px 24px; }
  .story-inner { max-width: 600px; margin: 0 auto; }
  .story-section .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #7a9e87; margin-bottom: 14px; }
  .story-section h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(26px, 4vw, 42px); font-weight: 300; color: #f4ede3; margin-bottom: 10px; line-height: 1.2; }
  .story-section .sub { font-size: 13px; color: #a09488; line-height: 1.8; margin-bottom: 36px; max-width: 480px; }

  .sf-group { margin-bottom: 16px; }
  .sf-group label { display: block; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #8a7d74; margin-bottom: 6px; }
  .sf-group input, .sf-group textarea {
    width: 100%; background: #3a3430; border: 1px solid #4a3e38; border-radius: 3px;
    padding: 12px 14px; font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 300;
    color: #f4ede3; outline: none; transition: border-color 0.2s;
  }
  .sf-group input::placeholder, .sf-group textarea::placeholder { color: #6a5e58; }
  .sf-group input:focus, .sf-group textarea:focus { border-color: #c4623a; }
  .sf-group textarea { resize: vertical; min-height: 130px; line-height: 1.7; }
  .sf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .sf-hint { font-size: 10px; color: #6a5e58; margin-top: 4px; }

  .story-btn { width: 100%; background: #c4623a; color: white; border: none; border-radius: 40px; padding: 14px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; margin-top: 8px; }
  .story-btn:hover { background: #9e4828; }
  .story-btn:disabled { background: #5a4a42; cursor: not-allowed; }

  .story-success { text-align: center; padding: 48px 0; }
  .story-success h3 { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #f4ede3; margin: 14px 0 10px; }
  .story-success p { font-size: 13px; color: #a09488; line-height: 1.8; }

  /* WHO SECTION */
  .peer-who { padding: 52px 24px; text-align: center; background: #f4ede3; }
  .peer-who .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #c4623a; margin-bottom: 14px; }
  .peer-who h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 3vw, 36px); font-weight: 300; margin-bottom: 14px; }
  .peer-who p { font-size: 13px; color: #8a7d74; line-height: 1.85; max-width: 460px; margin: 0 auto; }
  .peer-who p em { font-style: italic; color: #c4623a; font-family: 'Cormorant Garamond', serif; font-size: 17px; }

  @media (max-width: 640px) { .steps { grid-template-columns: repeat(2,1fr); } .sf-row { grid-template-columns: 1fr; } }
`;

export default function MeetYourPeer() {
  const [form, setForm] = useState({ story: '', email: '', phone: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="peer">

        <section className="peer-hero">
          <div className="eye">Peer Matching</div>
          <h1>Find someone who gets it —<br />because they've <em>been there.</em></h1>
          <p>Not a therapist. Not a helpline. A real person who went through a separation just like yours, and made it through.</p>
        </section>

        <div className="peer-body">
          <div className="steps">
            {[
              { n: "01", t: "Share your story", d: "Tell us briefly what you're going through and how you'd like to be supported." },
              { n: "02", t: "We find your match", d: "We match on situation, grief stage, and what you need most right now." },
              { n: "03", t: "Meet your peer", d: "Introduced via safe in-app message. No pressure. Just a conversation when you're ready." },
              { n: "04", t: "Walk together", d: "Check in weekly. Share what's hard. Witness each other through it." },
            ].map(s => (
              <div className="step" key={s.n}>
                <div className="sn">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* STORY CTA FORM */}
        <section className="story-section">
          <div className="story-inner">
            <div className="eye">Your Story</div>
            <h2>Tell us what<br />you're going through.</h2>
            <p className="sub">There's no right way to say it. Just write what's true. We'll read it carefully and reach back to find you the right person.</p>

            {sent ? (
              <div className="story-success">
                <div style={{ fontSize: 40 }}>🌿</div>
                <h3>We've heard you.</h3>
                <p>We'll review your story and reach back<br />within 48 hours with your peer match.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="sf-group">
                  <label>Your Story</label>
                  <textarea
                    name="story"
                    value={form.story}
                    onChange={onChange}
                    placeholder="What happened. How long ago. What's hardest right now. What kind of person you'd like to talk to. There are no wrong answers."
                    required
                  />
                </div>

                <div className="sf-row">
                  <div className="sf-group">
                    <label>Email <span style={{color:'#6a5e58',fontSize:'9px'}}>(optional)</span></label>
                    <input name="email" type="email" value={form.email} onChange={onChange} placeholder="your@email.com" />
                    <div className="sf-hint">We'll reach you here</div>
                  </div>
                  <div className="sf-group">
                    <label>Phone Number <span style={{color:'#6a5e58',fontSize:'9px'}}>(optional)</span></label>
                    <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 00000 00000" />
                    <div className="sf-hint">Or we'll call you back</div>
                  </div>
                </div>

                <button className="story-btn" disabled={loading}>{loading ? "Sending..." : "Share My Story →"}</button>
              </form>
            )}
          </div>
        </section>

        {/* WHO ARE PEERS */}
        <section className="peer-who">
          <div className="eye">Who Are Peers?</div>
          <h2>Survivors who chose to stay.</h2>
          <p>Peers are community members who completed our orientation and volunteered to help. Not professionals — <em>people who survived, and want to help you do the same.</em></p>
        </section>

      </div>
    </>
  );
}
