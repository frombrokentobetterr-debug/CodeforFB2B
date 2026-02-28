import { THEME } from '../styles/theme';
import { EVENTS } from '../data/events';

export default function Dashboard({ user, data, setPage, onBook, onGiveBack }) {
  const recommendedEvent = EVENTS.find(e => e.title === data.recommendedEvent) || EVENTS[0];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-greeting">Good to see you, <span>{user.name}</span>.</h1>
        <p className="dashboard-sub">Here's your personalized healing dashboard — you're doing great.</p>
      </div>

      {/* Healing Phase Card */}
      <div className="healing-phase" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -30, top: -30, fontSize: 160, opacity: 0.04, pointerEvents: "none" }}>🌿</div>
        <div className="phase-label">Your Healing Phase</div>
        <div className="phase-title">Phase: {data.phase}</div>
        <p className="phase-summary">{data.summary}</p>
        <div className="phase-insight">💡 {data.insight}</div>
        <div className="focus-chips">
          {data.focusAreas?.map((a, i) => <div key={i} className="focus-chip">{a}</div>)}
        </div>
      </div>

      <div className="dash-grid">
        {/* Recommended Event */}
        <div className="dash-card">
          <div className="dash-card-label">✨ Recommended For You</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{recommendedEvent.emoji}</div>
          <div className="dash-card-title">{recommendedEvent.title}</div>
          <div className="dash-card-desc">{recommendedEvent.desc}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="card-btn card-btn-primary" onClick={() => onBook(recommendedEvent)}>
              Book Now · {recommendedEvent.price}
            </button>
            <button className="card-btn card-btn-outline" onClick={() => setPage("events")}>
              See all events
            </button>
          </div>
        </div>

        {/* Community */}
        <div className="dash-card" style={{ background: "linear-gradient(135deg, rgba(124,158,142,0.08) 0%, rgba(196,160,154,0.08) 100%)" }}>
          <div className="dash-card-label">🤝 Community</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
          <div className="dash-card-title">Moving Forward Together</div>
          <div className="dash-card-desc">Connect with others who understand. Weekly virtual circles where you can share, listen, and heal side by side.</div>
          <button className="card-btn card-btn-outline">Join Community →</button>
        </div>

        {/* Book Session */}
        <div className="dash-card" style={{ background: "linear-gradient(135deg, rgba(196,160,154,0.1) 0%, rgba(158,112,112,0.06) 100%)" }}>
          <div className="dash-card-label">🌸 Private Support</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🧡</div>
          <div className="dash-card-title">Book a 1:1 Healing Session</div>
          <div className="dash-card-desc">60 minutes of personal, compassionate coaching with a certified specialist. Flexible scheduling, completely confidential.</div>
          <button className="card-btn card-btn-rose" onClick={() => onBook(EVENTS[5])}>
            Book Session · {EVENTS[5].price}
          </button>
        </div>

        {/* Give Back */}
        <div className="dash-card" style={{ background: "linear-gradient(135deg, rgba(124,158,142,0.1) 0%, rgba(168,196,181,0.15) 100%)" }}>
          <div className="dash-card-label">🌿 Give Back</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💚</div>
          <div className="dash-card-title">Help Someone Else Begin</div>
          <div className="dash-card-desc">You have walked through the fire and come out the other side. Your story could be the light that guides someone else through their darkest moment.</div>
          <button className="card-btn card-btn-primary" onClick={() => onGiveBack()}>
            Share My Story →
          </button>
        </div>
      </div>
    </div>
  );
}
