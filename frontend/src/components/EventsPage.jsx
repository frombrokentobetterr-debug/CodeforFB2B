import { THEME } from '../styles/theme';
import { EVENTS } from '../data/events';

export default function EventsPage({ onBook, user, onLogin }) {
  return (
    <div className="events-page">
      <div className="events-header">
        <div className="section-tag">Healing Programs</div>
        <h1 className="section-title">Workshops & Events</h1>
        <p className="section-sub">Expert-led programs designed to support every stage of your healing journey.</p>
      </div>
      <div className="events-grid">
        {EVENTS.map(ev => (
          <div key={ev.id} className="event-card">
            <div className="event-card-img" style={{
              background: ev.tag === "workshop"
                ? "rgba(124,158,142,0.1)"
                : ev.tag === "online"
                ? "rgba(196,160,154,0.1)"
                : "rgba(168,196,181,0.15)"
            }}>
              {ev.emoji}
            </div>
            <div className="event-card-body">
              <span className={`event-tag tag-${ev.tag}`}>{ev.tagLabel}</span>
              <div className="event-title">{ev.title}</div>
              <div className="event-desc">{ev.desc}</div>
              <div className="event-meta">
                <div className="event-meta-item">📅 {ev.date}</div>
                <div className="event-meta-item">🕐 {ev.time}</div>
              </div>
              <div className="event-meta">
                <div className="event-meta-item">📍 {ev.format}</div>
                <div className="event-meta-item" style={{ color: ev.spots === "Open" ? THEME.sage : THEME.dustyRose }}>
                  {ev.spots !== "Open" ? "⚡" : "✅"} {ev.spots}
                </div>
              </div>
              <div className="event-footer">
                <div className="event-price">{ev.price}</div>
                <button className="card-btn card-btn-primary" onClick={() => user ? onBook(ev) : onLogin()}>
                  {user ? "Book Now →" : "Sign In to Book"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
