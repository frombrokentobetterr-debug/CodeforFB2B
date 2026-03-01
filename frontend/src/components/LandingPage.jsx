import { useState } from "react";
import { THEME } from "../styles/theme";
import { FEATURES } from "../data/features";
import LearnHowModal from "./LearnHowModal";
import openDoorIcon from "../assets/icons/open-door.svg";

export default function LandingPage({ onStart, onSignin }) {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-blob" style={{ width: 400, height: 400, background: THEME.sageLight, top: "10%", right: "5%" }} />
        <div className="hero-blob" style={{ width: 250, height: 250, background: THEME.dustyRose, bottom: "15%", right: "25%" }} />
        <div className="hero-content">
          <img src={openDoorIcon} alt="" style={{ width: 72, height: "auto", marginBottom: 24, opacity: 0.92 }} />
          <div className="hero-tag">A safe space to heal & grow</div>
          <h1 className="hero-title">
            Your healing<br />journey starts<br /><em>here.</em>
          </h1>
          <p className="hero-sub">
            Separation and divorce are some of life's hardest transitions. We walk with you — with compassion, community, and expert guidance — toward a life that feels whole again.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={onStart}>Begin Your Journey →</button>
            <button className="btn-secondary" onClick={onSignin}>I have an account</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">4,200+</div>
              <div className="stat-label">Lives touched</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">96%</div>
              <div className="stat-label">Feel less alone</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">120+</div>
              <div className="stat-label">Events hosted</div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "0 48px" }}>
        <div style={{ flex: 1, height: 1, background: "rgba(124,158,142,0.15)" }} />
        <img src={openDoorIcon} alt="" style={{ width: 28, height: "auto", opacity: 0.35 }} />
        <div style={{ flex: 1, height: 1, background: "rgba(124,158,142,0.15)" }} />
      </div>

      {/* MISSION */}
      <section className="section" style={{ background: "white" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 className="section-title">You're not starting over.<br />You're starting <em style={{ fontStyle: "italic", color: THEME.sage }}>fresh.</em></h2>
              <p className="section-sub">
                We believe that the end of a relationship is not the end of your story. It's a profound, painful transition — and also an invitation to know yourself more deeply and live more authentically. From Broken to Better exists to walk with you through every step of that transformation.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "Judgment-free space to process and grieve",
                "AI-personalized healing paths based on your needs",
                "Evidence-based workshops and expert-led sessions",
                "A warm, supportive community of people who understand"
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,158,142,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 14, color: THEME.sage }}>✓</span>
                  </div>
                  <p style={{ fontSize: 15, color: THEME.textMid, lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "0 48px" }}>
        <div style={{ flex: 1, height: 1, background: "rgba(124,158,142,0.15)" }} />
        <img src={openDoorIcon} alt="" style={{ width: 28, height: "auto", opacity: 0.35 }} />
        <div style={{ flex: 1, height: 1, background: "rgba(124,158,142,0.15)" }} />
      </div>

      {/* HOW IT WORKS */}
      <section className="section">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-tag" style={{ display: "inline-block" }}>How It Works</div>
            <h2 className="section-title" style={{ maxWidth: 500, margin: "0 auto" }}>A thoughtful approach to your healing</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
                <button
                  onClick={() => setActiveFeature(f)}
                 style={{ marginTop: 16, fontSize: 13, padding: "10px 20px" }}
                  /*</div>  marginTop: 16, background: "none",
                    border: "1.5px solid rgba(124,158,142,0.3)",
                    borderRadius: 100, padding: "8px 18px",
                    fontSize: 13, color: THEME.sageDark,
                    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500, transition: "all 0.2s",
                  }}</div>*/
                >
                  Learn How
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 48px", background: "linear-gradient(135deg, #5A7A6A 0%, #7C9E8E 100%)", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <img src={openDoorIcon} alt="" style={{ width: 64, height: "auto", marginBottom: 28, opacity: 0.85, filter: "brightness(0) invert(1)" }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 300, color: "white", marginBottom: 20, lineHeight: 1.2 }}>
            You deserve to feel whole again.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 40, lineHeight: 1.7 }}>
            Take the first step today. It only takes a few minutes to receive your personalized healing path.
          </p>
          <button className="btn-primary" onClick={onStart} style={{ background: "white", color: "#5A7A6A", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>
            Start for Free — No Credit Card Needed
          </button>
        </div>
      </section>

      {/* Learn How Modal */}
      {activeFeature && (
        <LearnHowModal
          feature={activeFeature}
          onClose={() => setActiveFeature(null)}
          onStart={onStart}
        />
      )}
    </>
  );
}
