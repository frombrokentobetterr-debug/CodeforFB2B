import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(244, 237, 227, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid #e0d4c4;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    gap: 48px;
  }

  .nav-logo {
    flex-shrink: 0;
    margin-right: auto;
    position: relative;
    z-index: 2;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 300;
    color: #2a1e18;
    text-decoration: none;
    letter-spacing: 0.01em;
  }

  .nav-logo span { color: #c4623a; }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-links a {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6a5a50;
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }

  .nav-links a:hover { color: #2a1e18; }

  .nav-links a.active { color: #c4623a; }

  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: #c4623a;
  }

  .nav-cta {
    background: #c4623a;
    color: white !important;
    padding: 9px 22px;
    border-radius: 40px;
    font-size: 11px !important;
    letter-spacing: 0.15em !important;
    transition: background 0.2s !important;
    border: none;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
  }

  .nav-cta:hover { background: #9e4828; color: white !important; }
  .nav-cta::after { display: none !important; }

  .nav-user {
    font-size: 12px;
    letter-spacing: 0.08em;
    color: #2a1e18;
    font-weight: 300;
  }

  .nav-logout {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6a5a50;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    padding: 0;
    transition: color 0.2s;
  }

  .nav-logout:hover { color: #c4623a; }

  /* MOBILE */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 4px;
    background: none;
    border: none;
  }

  .nav-hamburger span {
    display: block;
    width: 22px; height: 1.5px;
    background: #6a5a50;
    transition: all 0.3s;
  }

  .nav-mobile {
    display: none;
    flex-direction: column;
    background: #f4ede3;
    border-top: 1px solid #e0d4c4;
    padding: 20px 32px 28px;
    gap: 20px;
  }

  .nav-mobile a {
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6a5a50;
    text-decoration: none;
  }

  .nav-mobile a.active { color: #c4623a; }

  .nav-mobile .nav-cta {
    display: inline-block;
    text-align: center;
    background: #c4623a;
    color: white !important;
    padding: 12px 24px;
    border-radius: 40px;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-hamburger { display: flex; }
    .nav-mobile.open { display: flex; }
  }
`;

export default function Nav({ onStart, onSignup, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const active = path => pathname === path ? "active" : "";
  const firstName = user?.user_metadata?.full_name?.split(" ")[0];

  const links = [
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/community", label: "Community" },
    { to: "/journal", label: "Journal" },
    { to: "/meet-your-peer", label: "Meet Your Peer" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{styles}</style>
      <nav className="nav">
        <div className="nav-inner">
          <Link to="/" className="nav-logo">From <span>Broken</span> to Better</Link>
          <div className="nav-links">
            {links.map(l => <Link key={l.to} to={l.to} className={active(l.to)}>{l.label}</Link>)}
            {user ? (
              <>
                <span className="nav-user">Hi, {firstName}</span>
                <button className="nav-logout" onClick={onLogout}>Sign Out</button>
              </>
            ) : (
              <Link to="/signin" className={active("/signin")}>Sign In</Link>
            )}
            <button className="nav-cta" onClick={() => { setOpen(false); onSignup?.(); }}>Sign Up</button>
          </div>
          <button className="nav-hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
        <div className={`nav-mobile ${open ? "open" : ""}`}>
          {links.map(l => <Link key={l.to} to={l.to} className={active(l.to)} onClick={() => setOpen(false)}>{l.label}</Link>)}
          {user ? (
            <button className="nav-logout" onClick={() => { setOpen(false); onLogout(); }}>Sign Out</button>
          ) : (
            <Link to="/signin" onClick={() => setOpen(false)}>Sign In</Link>
          )}
          <button className="nav-cta" onClick={() => { setOpen(false); onSignup?.(); }}>Sign Up</button>
        </div>
      </nav>
    </>
  );
}
