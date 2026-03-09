import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .blur-gate-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    min-height: 260px;
  }

  .blur-gate-blur-area {
    filter: blur(5px);
    pointer-events: none;
    user-select: none;
    padding: 4px;
  }

  .blur-gate-fake {
    background: linear-gradient(90deg, #ede4d8 0%, #f5efe7 50%, #ede4d8 100%);
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .blur-gate-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: linear-gradient(
      to bottom,
      rgba(244, 237, 227, 0)   0%,
      rgba(244, 237, 227, 0.6) 25%,
      rgba(244, 237, 227, 0.95) 100%
    );
  }

  .blur-gate-card {
    background: white;
    border-radius: 14px;
    padding: 36px 32px;
    text-align: center;
    box-shadow: 0 8px 48px rgba(42, 30, 24, 0.14);
    max-width: 380px;
    width: 100%;
  }

  .blur-gate-icon {
    font-size: 32px;
    margin-bottom: 14px;
  }

  .blur-gate-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #1c1410;
    line-height: 1.3;
    margin: 0 0 12px;
  }

  .blur-gate-sub {
    font-size: 12px;
    color: #8a7d74;
    line-height: 1.85;
    margin: 0 0 22px;
  }

  .blur-gate-btn {
    display: block;
    width: 100%;
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 14px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    margin-bottom: 16px;
  }
  .blur-gate-btn:hover { background: #9e4828; }

  .blur-gate-signin {
    font-size: 11px;
    color: #a09080;
    letter-spacing: 0.02em;
  }
  .blur-gate-signin a {
    color: #c4623a;
    text-decoration: none;
  }
  .blur-gate-signin a:hover { text-decoration: underline; }
`;

export default function AnswerBlurGate({ isLoggedIn, answerCount, onSignup, children }) {
  if (isLoggedIn) return <>{children}</>;

  const headline = answerCount > 0
    ? `${answerCount} ${answerCount === 1 ? "person has" : "people have"} shared their experience.`
    : "Be the first to share your experience.";

  return (
    <>
      <style>{styles}</style>
      <div className="blur-gate-wrap">
        <div className="blur-gate-blur-area">
          <div className="blur-gate-fake" style={{ height: 80 }} />
          <div className="blur-gate-fake" style={{ height: 56 }} />
          <div className="blur-gate-fake" style={{ height: 96 }} />
        </div>
        <div className="blur-gate-overlay">
          <div className="blur-gate-card">
            <div className="blur-gate-icon">🌿</div>
            <h3 className="blur-gate-headline">{headline}</h3>
            <p className="blur-gate-sub">
              Create a free account to read answers from people who truly
              understand what you are going through.
            </p>
            <button className="blur-gate-btn" onClick={onSignup}>
              Join Free →
            </button>
            <p className="blur-gate-signin">
              Already have an account?{" "}
              <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
