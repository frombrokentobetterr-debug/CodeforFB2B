import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .rp {
    min-height: 100vh;
    background: #f4ede3;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }

  .rp-card {
    background: white;
    border-radius: 24px;
    padding: 52px 48px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 4px 40px rgba(42,28,16,0.08);
  }

  .rp-wordmark {
    display: block;
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 300;
    color: #2a1e18;
    text-decoration: none;
    margin-bottom: 36px;
    letter-spacing: 0.01em;
  }
  .rp-wordmark span { color: #c4623a; }

  .rp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 300;
    color: #1c1410;
    margin: 0 0 8px;
    line-height: 1.2;
  }

  .rp-sub {
    font-size: 13px;
    color: #8a7a70;
    line-height: 1.7;
    margin: 0 0 32px;
  }

  .rp-center {
    text-align: center;
    padding: 8px 0;
  }

  .rp-center-icon {
    font-size: 38px;
    margin-bottom: 16px;
  }

  .rp-center-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    color: #1c1410;
    margin: 0 0 10px;
  }

  .rp-center-sub {
    font-size: 13px;
    color: #8a7d74;
    line-height: 1.7;
    margin: 0 0 28px;
  }

  .rp-btn {
    width: 100%;
    padding: 14px;
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 100px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
  }
  .rp-btn:hover { background: #9e4828; }
  .rp-btn:disabled { background: #c4a898; cursor: not-allowed; }

  .rp-back {
    display: block;
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    color: #a09080;
    text-decoration: none;
    transition: color 0.2s;
  }
  .rp-back:hover { color: #c4623a; }

  @media (max-width: 520px) {
    .rp-card { padding: 40px 28px; }
  }
`;

export default function ResetPassword() {
  const navigate = useNavigate();

  const [ready, setReady]       = useState(false);   // PASSWORD_RECOVERY event received
  const [expired, setExpired]   = useState(false);   // no valid token found
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY after it exchanges the token/code from the URL
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });

    // If no token/code in URL at all, mark expired immediately
    const hasToken =
      window.location.hash.includes("access_token") ||
      window.location.search.includes("code=");
    if (!hasToken) setExpired(true);

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!password)              { setError("Please enter a new password."); return; }
    if (password.length < 8)    { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm)   { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);

    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setDone(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rp">
        <div className="rp-card">

          <Link to="/" className="rp-wordmark">
            From <span>Broken</span> to Better
          </Link>

          {/* ── Expired / invalid link ── */}
          {expired ? (
            <div className="rp-center">
              <div className="rp-center-icon">🔗</div>
              <h1 className="rp-center-title">Link has expired.</h1>
              <p className="rp-center-sub">
                Reset links expire after 1 hour.<br />
                Request a new one from the sign in page.
              </p>
              <button className="rp-btn" onClick={() => navigate("/signin")}>
                Back to sign in
              </button>
            </div>

          ) : done ? (
            /* ── Success ── */
            <div className="rp-center">
              <div className="rp-center-icon">🌿</div>
              <h1 className="rp-center-title">Password updated.</h1>
              <p className="rp-center-sub">
                You're all set. Sign in with your new password whenever you're ready.
              </p>
              <button className="rp-btn" onClick={() => navigate("/signin")}>
                Go to sign in →
              </button>
            </div>

          ) : (
            /* ── Reset form ── */
            <>
              <h1 className="rp-title">Choose a new password</h1>
              <p className="rp-sub">Make it something you'll remember this time.</p>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="Type it again"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                />
              </div>

              {error && <p className="error-msg">{error}</p>}

              <button
                className="rp-btn"
                onClick={handleSubmit}
                disabled={loading || !ready}
              >
                {loading ? "Updating…" : !ready ? "Verifying link…" : "Update Password →"}
              </button>
            </>
          )}

          <Link to="/" className="rp-back">← Back to home</Link>
        </div>
      </div>
    </>
  );
}
