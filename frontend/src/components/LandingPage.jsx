import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FEATURES } from "../data/features";
import LearnHowModal from "./LearnHowModal";

export default function LandingPage({ onStart }) {
  const [activeFeature, setActiveFeature] = useState(null);

  return (
    <>
      <Helmet>
        <title>From Broken To Better — Walk Your Grief. Rebuild.</title>
        <meta name="description" content="A healing platform for people navigating separation and divorce in India. Find a peer who has walked your path." />
        <link rel="canonical" href="https://frombrokentobetter.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frombrokentobetter.com/" />
        <meta property="og:title" content="From Broken To Better — Walk Your Grief. Rebuild." />
        <meta property="og:description" content="A healing platform for people navigating separation and divorce in India. Find a peer who has walked your path." />
        <meta property="og:image" content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="From Broken To Better" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://frombrokentobetter.com/" />
        <meta name="twitter:title" content="From Broken To Better — Walk Your Grief. Rebuild." />
        <meta name="twitter:description" content="A healing platform for people navigating separation and divorce in India. Find a peer who has walked your path." />
        <meta name="twitter:image" content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>
      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 80px 80px",
        background: "#f4ede3",
      }}>
        <div style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#c4623a",
            marginBottom: 24,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
          }}>
            Take the first step today
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(52px, 7.5vw, 104px)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "#2a1e18",
            marginBottom: 36,
            letterSpacing: "-1px",
          }}>
            Walk your grief.<br />
            Feel whole again.<br />
            <em style={{ fontStyle: "italic", color: "#c4623a", fontWeight: 300 }}>Rebuild.</em>
          </h1>
          <p style={{
            fontSize: 18,
            lineHeight: 1.75,
            color: "#5a4a3a",
            marginBottom: 52,
            fontWeight: 300,
            maxWidth: 560,
            margin: "0 auto 52px",
          }}>
            Broken relationships hurt the same as death. But they cannot be told. This is your place to heal and grieve — out loud, without judgement.
          </p>
          <button className="btn-primary" onClick={onStart}>
            Begin Your Journey →
          </button>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(42,28,16,0.08)", margin: "0 48px" }} />

      {/* MISSION */}
      <section className="section" style={{ background: "white" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 className="section-title">
                You're not starting over.<br />
                You're starting <em style={{ fontStyle: "italic", color: "#c4623a" }}>fresh.</em>
              </h2>
              <p className="section-sub">
                We believe that the end of a relationship is not the end of your story. It's a profound, painful transition — and also an invitation to know yourself more deeply and live more authentically. From Broken to Better exists to walk with you through every step of that transformation.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "Judgment-free space to process and grieve",
                "AI-personalized healing paths based on your needs",
                "Evidence-based workshops and expert-led sessions",
                "A warm, supportive community of people who understand",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(196,98,58,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <span style={{ fontSize: 14, color: "#c4623a" }}>✓</span>
                  </div>
                  <p style={{ fontSize: 15, color: "#5a5a5a", lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(42,28,16,0.08)", margin: "0 48px" }} />

      {/* HOW IT WORKS */}
      <section className="section">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-tag" style={{ display: "inline-block" }}>How It Works</div>
            <h2 className="section-title" style={{ maxWidth: 500, margin: "0 auto" }}>
              A thoughtful approach to your healing
            </h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
                <button
                  onClick={() => setActiveFeature(f)}
                  style={{
                    marginTop: 20,
                    background: "#c4623a",
                    color: "white",
                    border: "none",
                    borderRadius: 100,
                    padding: "10px 22px",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#9e4828"}
                  onMouseLeave={e => e.currentTarget.style.background = "#c4623a"}
                >
                  Learn How
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND YOUR PEER */}
      <section style={{ background: "#1c1410", padding: "96px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#c4623a",
            marginBottom: 20,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Meet Your Peer
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 300,
            color: "#f4ede3",
            lineHeight: 1.25,
            marginBottom: 24,
          }}>
            You are not alone. Many walked the grief, many perished — meet somebody who survived.
          </h2>
          <p style={{
            fontSize: 16,
            color: "rgba(244,237,227,0.6)",
            marginBottom: 44,
            lineHeight: 1.75,
            fontWeight: 300,
          }}>
            Not a therapist. Not advice. A real person who went through a separation just like yours.
          </p>
          <Link
            to="/meet-your-peer"
            style={{
              display: "inline-block",
              background: "#c4623a",
              color: "white",
              borderRadius: 100,
              padding: "16px 40px",
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#9e4828"}
            onMouseLeave={e => e.currentTarget.style.background = "#c4623a"}
          >
            Find My Peer →
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 48px", background: "#c4623a", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px,4vw,52px)",
            fontWeight: 300,
            color: "white",
            marginBottom: 20,
            lineHeight: 1.2,
          }}>
            You deserve to feel whole again.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 40, lineHeight: 1.7 }}>
            Take the first step today. It only takes a few minutes to receive your personalized healing path.
          </p>
          <button
            className="btn-primary"
            onClick={onStart}
            style={{ background: "white", color: "#c4623a", boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
          >
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
