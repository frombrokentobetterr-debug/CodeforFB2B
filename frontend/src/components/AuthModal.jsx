import { useState } from "react";
import openDoorIcon from "../assets/icons/open-door.svg";

// In-memory user store (shared via prop drilling from App)
export default function AuthModal({ mode, setMode, onLogin, onSignup, onClose, mockDB }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name) { setError("Please enter your name."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 800));

    if (mode === "login") {
      const existing = mockDB.users[email];
      if (!existing || existing.password !== password) {
        setError("Invalid email or password."); setLoading(false); return;
      }
      onLogin(existing);
    } else {
      if (mockDB.users[email]) { setError("An account with this email already exists."); setLoading(false); return; }
      const userData = { name, email, password, createdAt: new Date().toISOString() };
      onSignup(userData);
    }
    setLoading(false);
  };

  return (
    <div className="auth-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="auth-card">
        <button className="auth-close" onClick={onClose}>×</button>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={openDoorIcon} alt="" style={{ height: 56, width: "auto" }} />
        </div>
        <h2 className="auth-title">{mode === "login" ? "Welcome back" : "Begin healing"}</h2>
        <p className="auth-sub">{mode === "login" ? "Sign in to continue your journey." : "Create your free account to get started."}</p>

        {mode === "signup" && (
          <div className="form-group">
            <label className="form-label">Your name</label>
            <input className="form-input" placeholder="First name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button className="form-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
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
