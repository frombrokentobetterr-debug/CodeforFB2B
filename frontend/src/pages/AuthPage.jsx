import { useState } from "react";
import { Link } from "react-router-dom";
import openDoorIcon from "../assets/icons/open-door.svg";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .auth-pg {
    min-height: 100vh;
    background: #f4ede3;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 24px 60px;
  }

  .auth-pg-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 480px;
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

  .auth-pg-divider {
    height: 1px;
    background: #ede3d8;
    margin: 28px 0;
  }

  .auth-pg-footer {
    text-align: center;
    margin-top: 24px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #8a7a70;
  }

  .auth-pg-footer a {
    color: #8a7a70;
    text-decoration: none;
    transition: color 0.2s;
  }

  .auth-pg-footer a:hover { color: #c4623a; }

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

  @media (max-width: 520px) {
    .auth-pg-card { padding: 40px 28px; }
  }
`;

export default function AuthPage({ mode: initialMode, onLogin, onSignup, mockDB }) {
  const [mode, setMode]       = useState(initialMode);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (next) => { setMode(next); setError(""); setName(""); setEmail(""); setPassword(""); };

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name) { setError("Please enter your name."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 700));

    if (mode === "login") {
      const existing = mockDB.users[email];
      if (!existing || existing.password !== password) {
        setError("Invalid email or password."); setLoading(false); return;
      }
      onLogin(existing);
    } else {
      if (mockDB.users[email]) {
        setError("An account with this email already exists."); setLoading(false); return;
      }
      onSignup({ name, email, password, createdAt: new Date().toISOString() });
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
                ? "Create your free account to start your healing journey."
                : "Continue your journey from where you left off."}
            </p>

            {mode === "signup" && (
              <div className="form-group">
                <label className="form-label">Your first name</label>
                <input
                  className="form-input"
                  placeholder="e.g. Anika"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button
              className="form-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{ marginTop: 4 }}
            >
              {loading
                ? "Please wait…"
                : mode === "signup"
                  ? "Create My Account →"
                  : "Sign In →"}
            </button>

            <div className="auth-pg-divider" />

            <p className="auth-pg-footer">
              {mode === "signup" ? "Already have an account? " : "New here? "}
              <button
                className="auth-pg-switch"
                onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
              >
                {mode === "signup" ? "Sign in" : "Create a free account"}
              </button>
            </p>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 20 }}>
            <Link to="/" className="auth-pg-footer" style={{ fontSize: 12, letterSpacing: "0.05em" }}>
              ← Back to home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
