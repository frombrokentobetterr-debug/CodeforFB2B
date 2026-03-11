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
      {/* SECTION 1 — Headline + Tiles */}
      <style>{`
        .s1-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 960px) {
          .s1-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
        }
        @media (max-width: 600px) {
          .s1-grid { grid-template-columns: 1fr; gap: 24px; }
        }
        .s1-tile {
          background: #fdf9f5;
          border: 1px solid rgba(196,98,58,0.12);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .s1-tile:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(42,28,16,0.12);
        }
        .s1-tile-btn {
          display: inline-block;
          margin-top: auto;
          padding-top: 28px;
          background: none;
          border: none;
          color: #c4623a;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.08em;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
          text-align: left;
        }
        .s1-tile-btn:hover { color: #9e4828; }
      `}</style>

      <section style={{
        background: "#f4ede3",
        padding: "120px 32px 120px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Headline */}
          <div style={{ textAlign: "center", marginBottom: 96 }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 400,
              lineHeight: 1.2,
              color: "#2a1e18",
              letterSpacing: "-0.5px",
              margin: 0,
            }}>
              Walk your grief. Feel whole again.<br />
              <em style={{ fontStyle: "italic", color: "#c4623a", fontWeight: 300 }}>Rebuild.</em>
            </h1>
          </div>

          {/* Tiles */}
          <div className="s1-grid">

            {/* Tile 1 */}
            <div className="s1-tile">
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#1c1410",
                margin: "0 0 16px",
                lineHeight: 1.3,
              }}>
                Understand Where You Are
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#8a7d74",
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
              }}>
                Pause for a moment.<br />
                Reflect on where you are right now.
              </p>
              <button className="s1-tile-btn" onClick={onStart}>
                Reflect on Your Journey →
              </button>
            </div>

            {/* Tile 2 */}
            <div className="s1-tile">
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#1c1410",
                margin: "0 0 16px",
                lineHeight: 1.3,
              }}>
                Learn From People Who Have Walked This Path
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#8a7d74",
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
              }}>
                You don't have to figure this out alone.
              </p>
              <Link to="/meet-your-peer" className="s1-tile-btn">
                Meet Your Peers →
              </Link>
            </div>

            {/* Tile 3 */}
            <div className="s1-tile">
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#1c1410",
                margin: "0 0 16px",
                lineHeight: 1.3,
              }}>
                Read Real Stories of Rebuilding
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#8a7d74",
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
              }}>
                Real journeys. Real beginnings again.
              </p>
              <Link to="/journal" className="s1-tile-btn">
                Explore the Journal →
              </Link>
            </div>

          </div>
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
                "Reflect on where you are",
                "Learn from people who have walked this path",
                "Read real stories of rebuilding",
                "Find a community that understands",
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
      <style>{`
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 900px) {
          .hiw-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .hiw-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="section">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="section-tag" style={{ display: "inline-block" }}>How It Works</div>
            <h2 className="section-title" style={{ maxWidth: 500, margin: "0 auto" }}>
              A simple path toward rebuilding your next chapter.
            </h2>
          </div>
          <div className="hiw-grid">
            {[
              {
                n: "1",
                title: "Reflect on where you are",
                desc: "Start with a short reflection assignment to understand your current state.",
              },
              {
                n: "2",
                title: "Connect with someone who understands",
                desc: "Meet peer mentors who have walked through separation and rebuilt their lives.",
              },
              {
                n: "3",
                title: "Begin rebuilding your next chapter",
                desc: "Join the community, attend sessions, and access guidance that helps you move forward.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ textAlign: "center", padding: "8px 16px" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 80,
                  fontWeight: 300,
                  lineHeight: 1,
                  color: "#c4623a",
                  marginBottom: 20,
                }}>
                  {n}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "#1c1410",
                  margin: "0 0 14px",
                  lineHeight: 1.3,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 14,
                  fontWeight: 300,
                  color: "#8a7d74",
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(42,28,16,0.08)", margin: "0 48px" }} />

      {/* GUIDE / PROFESSIONAL CTA */}
      <style>{`
        .role-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-top: 56px;
        }
        @media (max-width: 700px) {
          .role-grid { grid-template-columns: 1fr; }
        }
        .role-card-link {
          display: inline-block;
          margin-top: 28px;
          background: none;
          border: none;
          color: #c4623a;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.08em;
          cursor: pointer;
          text-decoration: none;
          transition: color 0.2s;
        }
        .role-card-link:hover { color: #9e4828; }
      `}</style>
      <section className="section" style={{ background: "#fdf9f5" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div className="section-tag" style={{ display: "inline-block" }}>Give Back</div>
            <h2 className="section-title">
              Help someone find their<br />
              <em style={{ fontStyle: "italic", color: "#c4623a" }}>next chapter.</em>
            </h2>
            <p className="section-sub" style={{ maxWidth: 600, margin: "0 auto 10px" }}>
              Have you navigated separation and rebuilt your life?
            </p>
            <p className="section-sub" style={{ maxWidth: 600, margin: "0 auto 10px" }}>
              Sometimes the most powerful support comes from someone who has simply walked the path before.
            </p>
            <p className="section-sub" style={{ maxWidth: 600, margin: "0 auto 0" }}>
              From Broken to Better invites people who have lived through separation, as well as trained professionals, to support others who are beginning this journey.
            </p>
          </div>

          {/* Role cards */}
          <div className="role-grid">

            {/* Peer Guide */}
            <div style={{
              background: "white",
              border: "1px solid rgba(196,98,58,0.12)",
              borderRadius: 20,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c4623a",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                marginBottom: 14,
              }}>
                Peer Guide
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#1c1410",
                margin: "0 0 18px",
                lineHeight: 1.3,
              }}>
                Someone who has walked this path
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#8a7d74",
                lineHeight: 1.75,
                margin: "0 0 12px",
                flex: 1,
              }}>
                People who have personally navigated separation and are willing to share perspective, encouragement, and conversation with others walking a similar path.
              </p>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 13,
                fontWeight: 300,
                color: "#a09080",
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic",
              }}>
                Some guides volunteer their time, while others may offer paid sessions.
              </p>
              <Link to="/become-a-guide" className="role-card-link">
                Become a Peer Guide →
              </Link>
            </div>

            {/* Professional */}
            <div style={{
              background: "white",
              border: "1px solid rgba(196,98,58,0.12)",
              borderRadius: 20,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c4623a",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 300,
                marginBottom: 14,
              }}>
                Professional
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 400,
                color: "#1c1410",
                margin: "0 0 18px",
                lineHeight: 1.3,
              }}>
                Trained to guide deeper healing
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: "#8a7d74",
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
              }}>
                Therapists, counselors, and other trained professionals who offer structured guidance and support for those who want deeper help.
              </p>
              <Link to="/become-a-guide" className="role-card-link">
                Apply as a Professional →
              </Link>
            </div>

          </div>
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
