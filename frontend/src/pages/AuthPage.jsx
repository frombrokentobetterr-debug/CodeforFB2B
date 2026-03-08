import { useState } from "react";
import { Link } from "react-router-dom";
import openDoorIcon from "../assets/icons/open-door.svg";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .auth-pg {
    min-height: 100vh;
    background: #f4ede3;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 100px 24px 60px;
  }

  .auth-pg-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 520px;
  }

  .auth-pg-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 32px;
    gap: 10px;
  }

  .auth-pg-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #2a1e18;
    letter-spacing: 0.01em;
    text-decoration: none;
  }

  .auth-pg-wordmark span { color: #c4623a; }

  .auth-pg-card {
    background: white;
    border-radius: 28px;
    padding: 52px 48px;
    width: 100%;
    box-shadow: 0 4px 40px rgba(42,28,16,0.08), 0 1px 4px rgba(42,28,16,0.05);
  }

  .auth-pg-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c4623a;
    margin-bottom: 8px;
    font-weight: 300;
  }

  .auth-pg-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px;
    font-weight: 300;
    color: #2a1e18;
    margin-bottom: 6px;
    line-height: 1.1;
  }

  .auth-pg-sub {
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #8a7a70;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .auth-pg-field-note {
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: #a09080;
    line-height: 1.7;
    margin-top: 8px;
  }

  .auth-pg-textarea {
    width: 100%;
    padding: 14px 18px;
    border: 1.5px solid rgba(0,0,0,0.1);
    border-radius: 12px;
    font-size: 15px;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    background: #faf7f2;
    color: #2a1e18;
    resize: vertical;
    min-height: 110px;
    outline: none;
    transition: border-color 0.2s;
    line-height: 1.6;
  }

  .auth-pg-textarea:focus { border-color: #c4623a; }

  .auth-pg-divider {
    height: 1px;
    background: #ede3d8;
    margin: 28px 0;
  }

  .auth-pg-footer-text {
    text-align: center;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #8a7a70;
  }

  .auth-pg-switch {
    display: inline;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 13px;
    font-family: 'Jost', sans-serif;
    font-weight: 400;
    color: #c4623a;
    padding: 0;
  }

  .auth-pg-back {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: #8a7a70;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .auth-pg-back:hover { color: #c4623a; }

  .auth-pg-opt {
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    color: #a09080;
    margin-left: 6px;
    letter-spacing: 0.05em;
  }

  @media (max-width: 560px) {
    .auth-pg-card { padding: 40px 28px; }
  }
`;

export default function AuthPage({ mode: initialMode, onLogin, onSignup }) {
  const [mode, setMode] = useState(initialMode);

  // Signup fields
  const [fullName, setFullName]         = useState("");
  const [signupEmail, setSignupEmail]   = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phone, setPhone]               = useState("");
  const [story, setStory]               = useState("");

  // Login fields
  const [loginEmail, setLoginEmail]       = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setError("");
    setFullName(""); setSignupEmail(""); setSignupPassword(""); setPhone(""); setStory("");
    setLoginEmail(""); setLoginPassword("");
  };

  const handleSubmit = async () => {
    setError("");

    if (mode === "login") {
      if (!loginEmail || !loginPassword) { setError("Please fill in all fields."); return; }
      setLoading(true);
      const { error: err } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (err) { setError(err.message); setLoading(false); return; }
      onLogin();
    } else {
      if (!fullName.trim()) { setError("Please enter your full name."); return; }
      if (!signupEmail.trim()) { setError("Please enter your email address."); return; }
      if (!/\S+@\S+\.\S+/.test(signupEmail)) { setError("Please enter a valid email address."); return; }
      if (!signupPassword || signupPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
      setLoading(true);
      const { error: err } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: { data: { full_name: fullName, phone } },
      });
      if (err) { setError(err.message); setLoading(false); return; }
      onSignup();
    }

    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-pg">
        <div className="auth-pg-wrap">

          {/* Brand */}
          <div className="auth-pg-brand">
            <Link to="/">
              <img src={openDoorIcon} alt="From Broken to Better" style={{ height: 44, width: "auto" }} />
            </Link>
            <Link to="/" className="auth-pg-wordmark">
              From <span>Broken</span> to Better
            </Link>
          </div>

          {/* Card */}
          <div className="auth-pg-card">
            <div className="auth-pg-eyebrow">
              {mode === "signup" ? "Join the community" : "Welcome back"}
            </div>
            <h1 className="auth-pg-title">
              {mode === "signup" ? "Begin healing" : "Sign in"}
            </h1>
            <p className="auth-pg-sub">
              {mode === "signup"
                ? "Tell us a little about yourself to get started."
                : "Continue your journey from where you left off."}
            </p>

            {/* ── SIGNUP FIELDS ── */}
            {mode === "signup" && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span style={{ color: "#c4623a" }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address <span style={{ color: "#c4623a" }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Password <span style={{ color: "#c4623a" }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="auth-pg-opt">(optional)</span>
                  </label>
                  <input
                    className="form-input"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">What is hurting you right now?</label>
                  <textarea
                    className="auth-pg-textarea"
                    placeholder="There is no right way to say it. Just write what you are feeling, or leave blank if you feel so.."
                    value={story}
                    onChange={e => setStory(e.target.value)}
                    rows={4}
                  />
                  <p className="auth-pg-field-note">
                    We ask because healing is not one-size-fits-all. The more you share, the better we can match you with the right peer, the right practitioner, and the right path. Your story stays private — always.
                  </p>
                </div>
              </>
            )}

            {/* ── LOGIN FIELDS ── */}
            {mode === "login" && (
              <>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    className="form-input"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  />
                </div>
              </>
            )}

            {error && <p className="error-msg">{error}</p>}

            <button
              className="form-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              {loading
                ? "Please wait…"
                : mode === "signup"
                  ? "Begin My Journey →"
                  : "Sign In →"}
            </button>

            <div className="auth-pg-divider" />

            <p className="auth-pg-footer-text">
              {mode === "signup" ? "Already have an account? " : "New here? "}
              <button
                className="auth-pg-switch"
                onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
              >
                {mode === "signup" ? "Sign in" : "Create a free account"}
              </button>
            </p>
          </div>

          <Link to="/" className="auth-pg-back">← Back to home</Link>

        </div>
      </div>
    </>
  );
}
