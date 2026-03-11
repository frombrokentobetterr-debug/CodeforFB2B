import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .rp {
    min-height: 100vh;
    background: #f4ede3;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 100px 24px 60px;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
  }

  .rp-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 480px;
  }

  .rp-wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #2a1e18;
    letter-spacing: 0.01em;
    text-decoration: none;
    margin-bottom: 32px;
  }
  .rp-wordmark span { color: #c4623a; }

  .rp-card {
    background: white;
    border-radius: 28px;
    padding: 52px 48px;
    width: 100%;
    box-shadow: 0 4px 40px rgba(42,28,16,0.08), 0 1px 4px rgba(42,28,16,0.05);
  }

  .rp-eyebrow {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #c4623a;
    margin-bottom: 8px;
    font-weight: 300;
  }

  .rp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 300;
    color: #2a1e18;
    margin-bottom: 8px;
    line-height: 1.15;
  }

  .rp-sub {
    font-size: 14px;
    color: #8a7a70;
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .rp-success {
    text-align: center;
    padding: 8px 0;
  }

  .rp-success-icon {
    font-size: 40px;
    margin-bottom: 16px;
  }

  .rp-success-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    color: #1c1410;
    margin: 0 0 12px;
    line-height: 1.2;
  }

  .rp-success-sub {
    font-size: 14px;
    color: #8a7d74;
    line-height: 1.7;
    margin: 0 0 28px;
  }

  .rp-error-state {
    text-align: center;
    padding: 8px 0;
  }

  .rp-invalid-icon {
    font-size: 36px;
    margin-bottom: 16px;
  }

  .rp-invalid-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px;
    font-weight: 300;
    color: #1c1410;
    margin: 0 0 10px;
  }

  .rp-invalid-sub {
    font-size: 13px;
    color: #8a7d74;
    line-height: 1.7;
    margin: 0 0 24px;
  }

  .rp-btn {
    width: 100%;
    padding: 15px;
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 100px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    letter-spacing: 0.1em;
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
    color: #8a7a70;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }
  .rp-back:hover { color: #c4623a; }

  @media (max-width: 560px) {
    .rp-card { padding: 40px 28px; }
  }
`;

export default function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [done, setDone]             = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  // Supabase puts the recovery token in the URL hash as #access_token=...&type=recovery
  // onAuthStateChange fires with PASSWORD_RECOVERY event when the page loads with that hash
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        // Token is valid — form is ready, nothing extra needed
        setInvalidLink(false);
      }
    });

    // If no hash token is present at all, mark the link as invalid
    const hash = window.location.hash;
    const hasToken = hash.includes("access_token") || hash.includes("code=");
    if (!hasToken) setInvalidLink(true);

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!password) { setError("Please enter a new password."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);

    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) { setError(err.message); setLoading(false); return; }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    setDone(true);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="rp">
        <div className="rp-wrap">

          <Link to="/" className="rp-wordmark">
            From <span>Broken</span> to Better
          </Link>

          <div className="rp-card">

            {/* ── Invalid or expired link ── */}
            {invalidLink ? (
              <div className="rp-error-state">
                <div className="rp-invalid-icon">🔗</div>
                <h1 className="rp-invalid-headline">This link has expired.</h1>
                <p className="rp-invalid-sub">
                  Password reset links expire after 1 hour. Request a new one from the sign in page.
                </p>
                <button className="rp-btn" onClick={() => navigate("/signin")}>
                  Back to sign in
                </button>
              </div>

            ) : done ? (
              /* ── Success ── */
              <div className="rp-success">
                <div className="rp-success-icon">🌿</div>
                <h1 className="rp-success-headline">Password updated.</h1>
                <p className="rp-success-sub">
                  You're all set. Sign in with your new password whenever you're ready.
                </p>
                <button className="rp-btn" onClick={() => navigate("/signin")}>
                  Go to sign in →
                </button>
              </div>

            ) : (
              /* ── Reset form ── */
              <>
                <div className="rp-eyebrow">New password</div>
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

                <button className="rp-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Updating…" : "Update Password →"}
                </button>
              </>
            )}

          </div>

          <Link to="/" className="rp-back">← Back to home</Link>

        </div>
      </div>
    </>
  );
}
