import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "../lib/supabase";

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
  .sf-group select {
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
    appearance: none;
    cursor: pointer;
  }
  .sf-group select:focus { border-color: #c4623a; }
  .sf-group select option[value=""] { color: #b8a898; }
  .sf-hint { font-size: 10px; color: #a09488; margin-top: 5px; }
  .peer-error { font-size: 12px; color: #c0392b; margin-top: 12px; line-height: 1.6; }

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
  { n: "01", title: "Tell us your story", text: "Share what this transition has been like for you. Write what feels honest — that's enough." },
  { n: "02", title: "Meet a mentor or peer guide", text: "Connect with someone who has walked through separation and rebuilt their life." },
  { n: "03", title: "Start a conversation", text: "Book a private session and talk openly with someone who understands the journey you're navigating." },
];

export default function MeetYourPeer() {
  const [form, setForm] = useState({
    story: "", email: "",
    separation_type: "", separation_timeline: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();

    const { error: err } = await supabase.from("seeker_profiles").insert({
      user_id: session?.user?.id ?? null,
      email: form.email,
      what_hurts: form.story,
      separation_type: form.separation_type || null,
      separation_timeline: form.separation_timeline || null,
      matching_status: "pending",
    });

    setLoading(false);
    if (err) {
      setError("Something went wrong. Please try again or email us directly at hello@frombrokentobetter.com");
    } else {
      setSent(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Find a Peer Guide | From Broken To Better</title>
        <meta name="description" content="Share your story and get matched with someone who has been through separation just like you. Peer support, not therapy." />
        <link rel="canonical" href="https://frombrokentobetter.com/meet-your-peer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frombrokentobetter.com/meet-your-peer" />
        <meta property="og:title" content="Find a Peer Guide | From Broken To Better" />
        <meta property="og:description" content="Share your story and get matched with someone who has been through separation just like you. Peer support, not therapy." />
        <meta property="og:image" content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="From Broken To Better" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://frombrokentobetter.com/meet-your-peer" />
        <meta name="twitter:title" content="Find a Peer Guide | From Broken To Better" />
        <meta name="twitter:description" content="Share your story and get matched with someone who has been through separation just like you. Peer support, not therapy." />
        <meta name="twitter:image" content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>
      <style>{styles}</style>
      <div className="peer">

        <div className="peer-split">
          {/* LEFT — dark walnut */}
          <div className="peer-left">
            <div className="pl-label">How It Works</div>
            <h2>Tell us your story.<br />Meet someone who understands.</h2>
            <p className="pl-sub">There's no perfect way to explain what you're going through. Just write what feels true.</p>

            <div className="peer-steps">
              {STEPS.map(s => (
                <div className="peer-step" key={s.n}>
                  <span className="ps-num">{s.n}</span>
                  <span className="ps-text">
                    <strong style={{ display: "block", color: "#e8d8cc", fontWeight: 400, marginBottom: 4 }}>{s.title}</strong>
                    {s.text}
                  </span>
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
                <h3>Your story has been received.</h3>
                <p>We will be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="sf-group">
                  <label>Tell us your story</label>
                  <textarea
                    name="story"
                    value={form.story}
                    onChange={onChange}
                    placeholder="What has this transition been like for you? You can share as much or as little as you want."
                    required
                  />
                </div>

                <div className="sf-group">
                  <label>Type of separation</label>
                  <select name="separation_type" value={form.separation_type} onChange={onChange}>
                    <option value="">Select one</option>
                    <option value="relationship">Relationship</option>
                    <option value="marriage">Marriage</option>
                    <option value="live_in">Living together</option>
                    <option value="long_term">Long-term partnership</option>
                    <option value="prefer_not">Prefer not to say</option>
                  </select>
                </div>

                <div className="sf-group">
                  <label>How long ago</label>
                  <select name="separation_timeline" value={form.separation_timeline} onChange={onChange}>
                    <option value="">Select one</option>
                    <option value="very_recent">Very recent</option>
                    <option value="few_months">A few months</option>
                    <option value="about_a_year">About a year</option>
                    <option value="several_years">Several years</option>
                  </select>
                </div>

                <div className="sf-group">
                  <label>Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                {error && <p className="peer-error">{error}</p>}

                <button className="peer-btn" disabled={loading}>
                  {loading ? "Sending…" : "Share your story →"}
                </button>
                <div className="sf-hint" style={{ textAlign: "center", marginTop: 12 }}>
                  We read every story personally.
                </div>
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
