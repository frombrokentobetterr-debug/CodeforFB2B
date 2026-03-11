import { useState } from "react";
import { useNavigate } from "react-router-dom";
import openDoorIcon from "../assets/icons/open-door.svg";
import { supabase } from "../lib/supabase";

const leafStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  @keyframes am-leaf-draw {
    from { stroke-dashoffset: 260; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes am-vein-draw {
    from { stroke-dashoffset: 70; }
    to   { stroke-dashoffset: 0; }
  }

  .am-leaf-path {
    stroke-dasharray: 260;
    stroke-dashoffset: 260;
    animation: am-leaf-draw 2.5s ease-in-out forwards;
  }
  .am-leaf-vein {
    stroke-dasharray: 70;
    stroke-dashoffset: 70;
    animation: am-vein-draw 2.5s ease-in-out 0.4s forwards;
  }

  .am-success {
    text-align: center;
    padding: 8px 0 4px;
  }
  .am-success-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #1c1410;
    margin: 18px 0 12px;
    line-height: 1.2;
  }
  .am-success-sub {
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: #8a7d74;
    line-height: 1.6;
    margin: 0 0 10px;
  }
  .am-success-note {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #8a7d74;
    font-style: italic;
    line-height: 1.6;
    margin: 0 0 26px;
  }
  .am-success-btn {
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 100px;
    padding: 14px 32px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.2s;
    width: 100%;
  }
  .am-success-btn:hover { background: #9e4828; }
`;

function LeafSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="am-leaf-path"
        d="M40 10 C65 12, 70 38, 40 70 C10 38, 15 12, 40 10 Z"
        stroke="#c4623a" strokeWidth="1.5" fill="none"
      />
      <path
        className="am-leaf-vein"
        d="M40 10 L40 70"
        stroke="#c4623a" strokeWidth="1" fill="none"
      />
    </svg>
  );
}

export default function AuthModal({ mode, setMode, onLogin, onSignup, onClose }) {
  const navigate = useNavigate();

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name.trim()) { setError("Please enter your name."); return; }
    if (mode === "signup" && password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");

    if (mode === "login") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      onLogin();
    } else {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${import.meta.env.VITE_APP_URL}/dashboard`,
        },
      });
      if (err) {
        setError("Something went wrong. Try again or reach out to us at admin@frombrokentobetter.com");
        setLoading(false);
        return;
      }
      setLoading(false);
      setSuccess(true);
      return;
    }

    setLoading(false);
  };

  // ── Success state ──
  if (success) {
    return (
      <div className="auth-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <style>{leafStyles}</style>
        <div className="auth-card">
          <button className="auth-close" onClick={onClose}>×</button>
          <div className="am-success">
            <LeafSVG />
            <h2 className="am-success-headline">You actually did it.</h2>
            <p className="am-success-sub">
              That took guts. Check your inbox, we sent you something at <strong>{email}</strong>.
            </p>
            <p className="am-success-note">
              No pressure on what comes next. We are here when you're ready.
            </p>
            <button
              className="am-success-btn"
              onClick={() => { onClose(); navigate("/dashboard"); }}
            >
              Take me to my account →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="auth-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{leafStyles}</style>
      <div className="auth-card">
        <button className="auth-close" onClick={onClose}>×</button>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={openDoorIcon} alt="" style={{ height: 56, width: "auto" }} />
        </div>
        <h2 className="auth-title">{mode === "login" ? "Welcome back" : "Begin healing"}</h2>
        <p className="auth-sub">
          {mode === "login" ? "Sign in to continue your journey." : "Create your free account to get started."}
        </p>

        {mode === "signup" && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Password{" "}
            {mode === "signup" && (
              <span style={{ fontSize: 11, color: "#a09080", fontWeight: 300 }}>
                (min 8 characters)
              </span>
            )}
          </label>
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

        <button className="form-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <p className="auth-switch">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
