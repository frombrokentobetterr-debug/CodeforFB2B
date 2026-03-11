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

  .am-forgot-link {
    display: block;
    text-align: right;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: #a09080;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-top: -10px;
    margin-bottom: 18px;
    transition: color 0.2s;
  }
  .am-forgot-link:hover { color: #c4623a; }

  .am-back-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    color: #a09080;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: 24px;
    transition: color 0.2s;
  }
  .am-back-link:hover { color: #c4623a; }
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

export default function AuthModal({ mode, setMode, onLogin, onClose }) {
  const navigate = useNavigate();

  const [view, setView]         = useState(mode); // "login" | "signup" | "forgot"
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Keep outer mode prop in sync when parent changes it
  const switchView = next => { setView(next); setMode(next !== "forgot" ? next : mode); setError(""); };

  // ── Login / Signup submit ──
  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (view === "signup" && !name.trim()) { setError("Please enter your name."); return; }
    if (view === "signup" && password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");

    if (view === "login") {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      onLogin();
    } else {
      try {
        const redirectTo = import.meta.env.VITE_APP_URL
          ? `${import.meta.env.VITE_APP_URL}/dashboard`
          : undefined;
        const { data: signUpData, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            ...(redirectTo && { emailRedirectTo: redirectTo }),
          },
        });
        if (err) {
          const isDup = err.message?.toLowerCase().includes("already registered") ||
                        err.message?.toLowerCase().includes("already exists") ||
                        err.status === 422;
          setError(isDup
            ? "An account with this email already exists. Use the Sign in link below."
            : "Something went wrong. Try again or reach out to us at admin@frombrokentobetter.com"
          );
          setLoading(false);
          return;
        }
        if (signUpData?.user?.identities?.length === 0) {
          setError("An account with this email already exists. Use the Sign in link below.");
          setLoading(false);
          return;
        }
      } catch {
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

  // ── Forgot password submit ──
  const handleForgot = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");
    try {
      const redirectTo = import.meta.env.VITE_APP_URL
        ? `${import.meta.env.VITE_APP_URL}/reset-password`
        : `${window.location.origin}/reset-password`;
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });
      if (err) { setError(err.message); setLoading(false); return; }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }
    setLoading(false);
    setResetSent(true);
  };

  // ── Signup success state ──
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

  // ── Forgot password view ──
  if (view === "forgot") {
    return (
      <div className="auth-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <style>{leafStyles}</style>
        <div className="auth-card">
          <button className="auth-close" onClick={onClose}>×</button>

          {resetSent ? (
            <div className="am-success">
              <div style={{ fontSize: 36, marginBottom: 16 }}>📬</div>
              <h2 className="am-success-headline">Check your inbox.</h2>
              <p className="am-success-sub">
                We sent a password reset link to <strong>{email}</strong>.
              </p>
              <p className="am-success-note">
                If it doesn't show up in a minute, check your spam folder.
              </p>
              <button className="am-success-btn" onClick={onClose}>
                Got it, close this
              </button>
            </div>
          ) : (
            <>
              <button className="am-back-link" onClick={() => switchView("login")}>
                ← Back to sign in
              </button>
              <h2 className="auth-title">Reset your password</h2>
              <p className="auth-sub" style={{ marginBottom: 28 }}>
                Enter the email you signed up with and we'll send a reset link.
              </p>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleForgot()}
                />
              </div>
              {error && <p className="error-msg">{error}</p>}
              <button className="form-btn" onClick={handleForgot} disabled={loading}>
                {loading ? "Sending…" : "Send Reset Link →"}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Login / Signup form ──
  return (
    <div className="auth-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <style>{leafStyles}</style>
      <div className="auth-card">
        <button className="auth-close" onClick={onClose}>×</button>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={openDoorIcon} alt="" style={{ height: 56, width: "auto" }} />
        </div>
        <h2 className="auth-title">{view === "login" ? "Welcome back" : "Begin healing"}</h2>
        <p className="auth-sub">
          {view === "login" ? "Sign in to continue your journey." : "Create your free account to get started."}
        </p>

        {view === "signup" && (
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
            {view === "signup" && (
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

        {view === "login" && (
          <button className="am-forgot-link" onClick={() => switchView("forgot")}>
            Forgot your password?
          </button>
        )}

        {error && <p className="error-msg">{error}</p>}

        <button className="form-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait…" : view === "login" ? "Sign In" : "Create Account"}
        </button>

        <p className="auth-switch">
          {view === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => switchView(view === "login" ? "signup" : "login")}>
            {view === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
