import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .peer { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; color: #2a2420; }

  /* TWO-COLUMN SPLIT */
  .peer-split {
    display: flex;
    align-items: stretch;
    min-height: 100vh;
    width: 100%;
  }

  /* LEFT — dark walnut */
  .peer-left {
    flex: 0 0 50%;
    background: #1c1410;
    padding: 64px;
    display: flex;
    flex-direction: column;
    color: #f4ede3;
  }
  .peer-left .pl-label {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #a05a3a;
    margin-bottom: 24px;
  }
  .peer-left h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 48px);
    font-weight: 300;
    line-height: 1.2;
    color: #f4ede3;
    margin-bottom: 16px;
  }
  .peer-left .pl-sub {
    font-size: 13px;
    color: #a09080;
    line-height: 1.8;
    margin-bottom: 48px;
  }

  .peer-steps { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; }
  .peer-step {
    padding: 20px 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .peer-step:last-child { border-bottom: 1px solid rgba(255,255,255,0.08); }
  .ps-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    color: #a05a3a;
    letter-spacing: 0.05em;
    flex-shrink: 0;
    padding-top: 1px;
  }
  .ps-text {
    font-size: 13px;
    color: #c8b8ac;
    line-height: 1.75;
  }

  .peer-left .pl-footer {
    margin-top: 48px;
    font-size: 10px;
    color: #5a4a40;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  /* RIGHT — cream form */
  .peer-right {
    flex: 0 0 50%;
    background: #f4ede3;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* FORM FIELDS */
  .sf-group { margin-bottom: 20px; }
  .sf-group label {
    display: block;
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #8a7d74;
    margin-bottom: 6px;
  }
  .sf-group input,
  .sf-group textarea {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e0d4c4;
    border-radius: 4px;
    padding: 12px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2a2420;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .sf-group input::placeholder,
  .sf-group textarea::placeholder { color: #b8a898; }
  .sf-group input:focus,
  .sf-group textarea:focus { border-color: #c4623a; }
  .sf-group textarea { resize: vertical; min-height: 140px; line-height: 1.7; }
  .sf-hint { font-size: 10px; color: #a09488; margin-top: 5px; }

  .peer-btn {
    width: 100%;
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 15px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
  }
  .peer-btn:hover { background: #9e4828; }
  .peer-btn:disabled { background: #c4a898; cursor: not-allowed; }

  .peer-success { text-align: center; padding: 48px 0; }
  .peer-success h3 { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #2a2420; margin: 14px 0 10px; }
  .peer-success p { font-size: 13px; color: #8a7d74; line-height: 1.8; }

  /* WHO ARE PEERS */
  .peer-who { padding: 64px 24px; text-align: center; background: #f4ede3; border-top: 1px solid #ede3d8; }
  .peer-who .eye { font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: #c4623a; margin-bottom: 14px; }
  .peer-who h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 3vw, 36px); font-weight: 300; margin-bottom: 14px; }
  .peer-who p { font-size: 13px; color: #8a7d74; line-height: 1.85; max-width: 460px; margin: 0 auto; }
  .peer-who p em { font-style: italic; color: #c4623a; font-family: 'Cormorant Garamond', serif; font-size: 17px; }

  /* MOBILE */
  @media (max-width: 768px) {
    .peer-split { flex-direction: column; }
    .peer-left  { flex: none; padding: 48px 28px; }
    .peer-right { flex: none; padding: 48px 28px; }
  }
`;

const STEPS = [
  { n: "01", text: "You share your story — how long you were together, how long since the separation." },
  { n: "02", text: "We read it personally and find someone whose experience mirrors yours." },
  { n: "03", text: "We introduce you. No pressure. Just a conversation when you're ready." },
];

export default function MeetYourPeer() {
  const [form, setForm] = useState({ name: "", story: "", email: "", phone: "" });
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

        <div className="peer-split">
          {/* LEFT — dark walnut */}
          <div className="peer-left">
            <div className="pl-label">Find Your Peer</div>
            <h2>Tell us your story.<br />We'll find your person.</h2>
            <p className="pl-sub">There's no right way to say it. Just write what's true.</p>

            <div className="peer-steps">
              {STEPS.map(s => (
                <div className="peer-step" key={s.n}>
                  <span className="ps-num">{s.n}</span>
                  <span className="ps-text">{s.text}</span>
                </div>
              ))}
            </div>

            <p className="pl-footer">We read every story personally. You'll hear from us within 48 hours.</p>
          </div>

          {/* RIGHT — cream form */}
          <div className="peer-right">
            {sent ? (
              <div className="peer-success">
                <div style={{ fontSize: 40 }}>🌿</div>
                <h3>We've heard you.</h3>
                <p>We'll review your story and reach back<br />within 48 hours with your peer match.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="sf-group">
                  <label>Full Name</label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    placeholder="What should we call you?"
                    required
                  />
                </div>

                <div className="sf-group">
                  <label>Share Your Story</label>
                  <textarea
                    name="story"
                    value={form.story}
                    onChange={onChange}
                    placeholder="How long were you together? How long since the separation? What is hardest right now?"
                    required
                  />
                </div>

                <div className="sf-group">
                  <label>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="sf-group">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+91 00000 00000"
                  />
                  <div className="sf-hint">Optional — we'll call you if you'd prefer to talk</div>
                </div>

                <button className="peer-btn" disabled={loading}>
                  {loading ? "Sending..." : "Find My Peer →"}
                </button>
              </form>
            )}
          </div>
        </div>

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
