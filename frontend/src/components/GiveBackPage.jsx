import { useState } from "react";
import { THEME } from "../styles/theme";

export default function GiveBackPage({ onBack }) {
  const [form, setForm] = useState({ name: "", email: "", story: "", consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.story || !form.consent) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: THEME.cream }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 48px" }}>

        {/* Back */}
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: THEME.sage, fontSize: 14, cursor: "pointer", marginBottom: 36, display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif" }}
        >
          ← Back
        </button>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🌿</div>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: THEME.sage, fontWeight: 500, marginBottom: 16 }}>
            Give Back
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 300, color: THEME.textDark, lineHeight: 1.2, marginBottom: 20 }}>
            You healed.<br />Now help someone else begin.
          </h1>
          <p style={{ fontSize: 17, color: THEME.textMid, lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
            Your story of survival, growth, and healing is one of the most powerful things you can offer someone who is just beginning their journey. You don't need to be perfect. You just need to be real.
          </p>
        </div>

        {/* Why it matters */}
        <div style={{ background: "white", borderRadius: 24, padding: "40px 48px", marginBottom: 40, border: "1px solid rgba(124,158,142,0.15)", boxShadow: `0 2px 16px ${THEME.shadow}` }}>
          <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: THEME.sage, fontWeight: 500, marginBottom: 20 }}>Why This Matters</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { emoji: "💬", title: "Stories heal", desc: "Reading about someone who made it through gives hope to those still in the dark." },
              { emoji: "🤝", title: "You're not alone", desc: "Sharing your story reminds others — and yourself — that healing is truly possible." },
              { emoji: "🌱", title: "Give meaning", desc: "Turning your pain into purpose is one of the most powerful acts of healing." },
              { emoji: "❤️", title: "Safe & supported", desc: "Your story is shared with your permission only, reviewed with care before publishing." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(124,158,142,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {item.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: THEME.textMid, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form or Success */}
        {submitted ? (
          <div style={{ background: "linear-gradient(135deg, rgba(124,158,142,0.12) 0%, rgba(196,160,154,0.1) 100%)", borderRadius: 24, padding: "56px 48px", textAlign: "center", border: "1px solid rgba(124,158,142,0.2)" }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>🌸</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 300, marginBottom: 12 }}>
              Thank you, {form.name.split(" ")[0]}.
            </h2>
            <p style={{ fontSize: 16, color: THEME.textMid, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              Your story has been received with so much gratitude. Our team will review it carefully and reach out to you at <strong>{form.email}</strong> before anything is published. You are making a real difference.
            </p>
          </div>
        ) : (
          <div style={{ background: "white", borderRadius: 24, padding: "40px 48px", border: "1px solid rgba(124,158,142,0.15)", boxShadow: `0 2px 16px ${THEME.shadow}` }}>
            <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: THEME.sage, fontWeight: 500, marginBottom: 28 }}>
              Share Your Story
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: THEME.textMid, display: "block", marginBottom: 8 }}>Your name</label>
                <input
                  className="form-input"
                  placeholder="First name or nickname"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: THEME.textMid, display: "block", marginBottom: 8 }}>Email address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: THEME.textMid, display: "block", marginBottom: 8 }}>
                Your healing story
                <span style={{ color: THEME.textLight, fontWeight: 400, marginLeft: 8 }}>— Where were you? What helped? Where are you now?</span>
              </label>
              <textarea
                className="q-textarea"
                placeholder="Share as much or as little as you're comfortable with. There's no right or wrong way to tell your story..."
                rows={7}
                value={form.story}
                onChange={e => setForm({ ...form, story: e.target.value })}
                style={{ minHeight: 160 }}
              />
            </div>

            <div
              onClick={() => setForm({ ...form, consent: !form.consent })}
              style={{ display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer", marginBottom: 28, padding: "16px 20px", background: THEME.cream, borderRadius: 14, border: `1.5px solid ${form.consent ? THEME.sage : "rgba(0,0,0,0.08)"}`, transition: "border-color 0.2s" }}
            >
              <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${form.consent ? THEME.sage : "rgba(0,0,0,0.2)"}`, background: form.consent ? THEME.sage : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                {form.consent && <span style={{ color: "white", fontSize: 13 }}>✓</span>}
              </div>
              <p style={{ fontSize: 13, color: THEME.textMid, lineHeight: 1.6 }}>
                I consent to my story being reviewed and potentially shared on From Broken to Better to help others. I understand it will be reviewed before publishing and I can withdraw at any time.
              </p>
            </div>

            <button
              className="form-btn"
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email || !form.story || !form.consent}
            >
              {loading ? "Submitting..." : "Submit My Story 🌿"}
            </button>
          </div>
        )}

        {/* Quote */}
        <div style={{ textAlign: "center", marginTop: 48, padding: "32px 40px", borderTop: "1px solid rgba(124,158,142,0.15)" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, color: THEME.textMid, fontStyle: "italic", lineHeight: 1.6 }}>
            "The wound is the place where the light enters you."
          </p>
          <p style={{ fontSize: 13, color: THEME.textLight, marginTop: 8 }}>— Rumi</p>
        </div>

      </div>
    </div>
  );
}
