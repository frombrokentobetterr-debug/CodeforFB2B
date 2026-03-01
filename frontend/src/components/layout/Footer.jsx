import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .footer {
    background: #1c1410;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    color: #a09080;
  }

  .footer-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 56px 32px 40px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 48px;
  }

  .footer-brand .wordmark {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #e8ddd0;
    margin-bottom: 8px;
  }

  .footer-brand .wordmark span { color: #c4623a; }

  .footer-brand .tagline {
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #6a5a50;
  }

  .footer-cta {
    display: inline-block;
    border: 1px solid #3a2e28;
    color: #a09080;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 12px 28px;
    border-radius: 40px;
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;
    white-space: nowrap;
  }

  .footer-cta:hover { border-color: #c4623a; color: #e8ddd0; }

  .footer-divider {
    border: none;
    border-top: 1px solid #2a2018;
    margin: 0 32px;
  }

  .footer-bottom {
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }

  .footer-nav {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
  }

  .footer-nav a {
    font-size: 12px;
    color: #6a5a50;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .footer-nav a:hover { color: #c4623a; }

  .footer-copy {
    font-size: 11px;
    color: #4a3e38;
    letter-spacing: 0.05em;
  }

  .footer-made {
    font-size: 11px;
    color: #4a3e38;
    font-style: italic;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    .footer-main { grid-template-columns: 1fr; gap: 28px; }
    .footer-bottom { flex-direction: column; align-items: flex-start; }
  }
`;

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="wordmark">From <span>Broken</span> to Better</div>
            <div className="tagline">Walk your grief. Rebuild.</div>
          </div>
          <Link to="/register" className="footer-cta">Begin Your Journey →</Link>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <nav className="footer-nav">
            <Link to="/about">About</Link>
            <Link to="/events">Events</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/meet-your-peer">Meet Your Peer</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
          </nav>
          <div className="footer-copy">© 2026 From Broken to Better. All rights reserved.</div>
          <div className="footer-made">Made with care for those who are healing.</div>
        </div>
      </footer>
    </>
  );
}
