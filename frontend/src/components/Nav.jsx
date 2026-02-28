import { THEME } from '../styles/theme';

export default function Nav({ user, page, setPage, onLogin, onSignup, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("landing")}>
        From <span>Broken</span> to Better
      </div>
      <div className="nav-links">
        <button className="nav-link" onClick={() => setPage("events")}>Events</button>
        <button className="nav-link" onClick={() => setPage("blog")}>Journal</button>
        {user ? (
          <>
            <button className="nav-link" onClick={() => setPage("dashboard")}>My Journey</button>
            <button className="nav-link" onClick={onLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <button className="nav-link" onClick={onLogin}>Sign In</button>
            <button className="nav-btn" onClick={onSignup}>Begin Healing</button>
          </>
        )}
      </div>
    </nav>
  );
}
