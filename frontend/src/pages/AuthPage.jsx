import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  .auth-pg-forgot-link {
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
  .auth-pg-forgot-link:hover { color: #c4623a; }

  .auth-pg-back-link {
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
  .auth-pg-back-link:hover { color: #c4623a; }

  /* ── Leaf animation ── */
  @keyframes ap-leaf-draw {
    from { stroke-dashoffset: 260; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes ap-vein-draw {
    from { stroke-dashoffset: 70; }
    to   { stroke-dashoffset: 0; }
  }

  .ap-leaf-path {
    stroke-dasharray: 260;
    stroke-dashoffset: 260;
    animation: ap-leaf-draw 2.5s ease-in-out forwards;
  }
  .ap-leaf-vein {
    stroke-dasharray: 70;
    stroke-dashoffset: 70;
    animation: ap-vein-draw 2.5s ease-in-out 0.4s forwards;
  }

  /* ── Success / sent states ── */
  .auth-pg-success {
    text-align: center;
    padding: 8px 0 4px;
  }
  .auth-pg-success-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 400;
    color: #1c1410;
    margin: 18px 0 12px;
    line-height: 1.2;
  }
  .auth-pg-success-sub {
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    color: #8a7d74;
    line-height: 1.6;
    margin: 0 0 10px;
  }
  .auth-pg-success-note {
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #8a7d74;
    font-style: italic;
    line-height: 1.6;
    margin: 0 0 26px;
  }
  .auth-pg-success-btn {
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
  .auth-pg-success-btn:hover { background: #9e4828; }

  @media (max-width: 560px) {
    .auth-pg-card { padding: 40px 28px; }
  }
`;

function LeafSVG() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        className="ap-leaf-path"
        d="M40 10 C65 12, 70 38, 40 70 C10 38, 15 12, 40 10 Z"
        stroke="#c4623a" strokeWidth="1.5" fill="none"
      />
      <path
        className="ap-leaf-vein"
        d="M40 10 L40 70"
        stroke="#c4623a" strokeWidth="1" fill="none"
      />
    </svg>
  );
}

export default function AuthPage({ mode: initialMode, onLogin }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode); // "login" | "signup" | "forgot"

  // Signup fields
  const [fullName, setFullName]             = useState("");
  const [signupEmail, setSignupEmail]       = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Login fields
  const [loginEmail, setLoginEmail]         = useState("");
  const [loginPassword, setLoginPassword]   = useState("");

  // Forgot fields
  const [forgotEmail, setForgotEmail]       = useState("");

  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const switchMode = next => {
    setMode(next);
    setError("");
    setFullName(""); setSignupEmail(""); setSignupPassword("");
    setLoginEmail(""); setLoginPassword("");
    setForgotEmail("");
  };

  // ── Login / Signup submit ──
  const handleSubmit = async () => {
    setError("");

    if (mode === "login") {
      if (!loginEmail || !loginPassword) { setError("Please fill in all fields."); return; }
      setLoading(true);
      const { error: err } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
      if (err) { setError(err.message); setLoading(false); return; }
      onLogin();
    } else {
      if (!fullName.trim())                  { setError("Please enter your full name."); return; }
      if (!signupEmail.trim())               { setError("Please enter your email address."); return; }
      if (!/\S+@\S+\.\S+/.test(signupEmail)) { setError("Please enter a valid email address."); return; }
      if (signupPassword.length < 8)         { setError("Password must be at least 8 characters."); return; }
      setLoading(true);
      try {
        const redirectTo = import.meta.env.VITE_APP_URL
          ? `${import.meta.env.VITE_APP_URL}/dashboard`
          : undefined;
        const { data: signUpData, error: err } = await supabase.auth.signUp({
          email: signupEmail,
          password: signupPassword,
          options: {
            data: { full_name: fullName },
            ...(redirectTo && { emailRedirectTo: redirectTo }),
          },
        });
        if (err) {
          const isDup = err.message?.toLowerCase().includes("already registered") ||
                        err.message?.toLowerCase().includes("already exists") ||
                        err.status === 422;
          setError(isDup
            ? "An account with this email already exists. Sign in instead."
            : "Something went wrong. Try again or reach out to us at admin@frombrokentobetter.com"
          );
          setLoading(false);
          return;
        }
        if (signUpData?.user?.identities?.length === 0) {
          setError("An account with this email already exists. Sign in instead.");
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
    if (!forgotEmail.trim()) { setError("Please enter your email address."); return; }
    setLoading(true);
    setError("");
    try {
      const redirectTo = import.meta.env.VITE_APP_URL
        ? `${import.meta.env.VITE_APP_URL}/reset-password`
        : `${window.location.origin}/reset-password`;
      const { error: err } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
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

            {/* ── Signup success ── */}
            {success ? (
              <div className="auth-pg-success">
                <LeafSVG />
                <h1 className="auth-pg-success-headline">You actually did it.</h1>
                <p className="auth-pg-success-sub">
                  That took guts. Check your inbox, we sent you something at{" "}
                  <strong>{signupEmail}</strong>.
                </p>
                <p className="auth-pg-success-note">
                  No pressure on what comes next. We are here when you're ready.
                </p>
                <button
                  className="auth-pg-success-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  Take me to my account →
                </button>
              </div>

            ) : mode === "forgot" ? (
              /* ── Forgot password ── */
              resetSent ? (
                <div className="auth-pg-success">
                  <div style={{ fontSize: 36, marginBottom: 16 }}>📬</div>
                  <h1 className="auth-pg-success-headline">Check your inbox.</h1>
                  <p className="auth-pg-success-sub">
                    We sent a password reset link to <strong>{forgotEmail}</strong>.
                  </p>
                  <p className="auth-pg-success-note">
                    If it doesn't show up in a minute, check your spam folder.
                  </p>
                  <button
                    className="auth-pg-success-btn"
                    onClick={() => switchMode("login")}
                  >
                    Back to sign in
                  </button>
                </div>
              ) : (
                <>
                  <button className="auth-pg-back-link" onClick={() => switchMode("login")}>
                    ← Back to sign in
                  </button>
                  <div className="auth-pg-eyebrow">Password reset</div>
                  <h1 className="auth-pg-title">Reset your password</h1>
                  <p className="auth-pg-sub">
                    Enter the email you signed up with and we'll send a reset link.
                  </p>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleForgot()}
                    />
                  </div>
                  {error && <p className="error-msg">{error}</p>}
                  <button
                    className="form-btn"
                    onClick={handleForgot}
                    disabled={loading}
                    style={{ marginTop: 8 }}
                  >
                    {loading ? "Sending…" : "Send Reset Link →"}
                  </button>
                </>
              )

            ) : (
              /* ── Login / Signup ── */
              <>
                <div className="auth-pg-eyebrow">
                  {mode === "signup" ? "From Broken to Better" : "Welcome back"}
                </div>
                <h1 className="auth-pg-title">
                  {mode === "signup" ? "A new chapter begins here" : "Sign in"}
                </h1>
                <p className="auth-pg-sub">
                  {mode === "signup"
                    ? "Create your account to begin moving forward."
                    : "Continue your journey from where you left off."}
                </p>

                {/* Signup fields */}
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
                        Password <span style={{ color: "#c4623a" }}>*</span>{" "}
                        <span style={{ fontSize: 11, color: "#a09080", fontWeight: 300 }}>
                          (min 8 characters)
                        </span>
                      </label>
                      <input
                        className="form-input"
                        type="password"
                        placeholder="At least 8 characters"
                        value={signupPassword}
                        onChange={e => setSignupPassword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      />
                    </div>
                  </>
                )}

                {/* Login fields */}
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
                    <button className="auth-pg-forgot-link" onClick={() => switchMode("forgot")}>
                      Forgot your password?
                    </button>
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
                      ? "Create my account"
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
              </>
            )}

          </div>

          <Link to="/" className="auth-pg-back">← Back to home</Link>

        </div>
      </div>
    </>
  );
}
