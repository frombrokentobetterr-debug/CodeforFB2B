import { THEME } from "../styles/theme";

export default function LearnHowModal({ feature, onClose, onStart }) {
  if (!feature) return null;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 400,
        background: "rgba(44,44,44,0.55)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "white", borderRadius: 28,
        padding: "48px 52px", maxWidth: 560, width: "100%",
        boxShadow: "0 24px 80px rgba(0,0,0,0.15)",
        position: "relative", maxHeight: "90vh", overflowY: "auto",
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20,
            width: 36, height: 36, borderRadius: "50%",
            border: "none", background: THEME.sand,
            cursor: "pointer", fontSize: 18, color: THEME.textMid,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* Icon */}
        <div style={{
          width: 64, height: 64, borderRadius: 20,
          background: "rgba(124,158,142,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 30, marginBottom: 24,
        }}>
          {feature.icon}
        </div>

        {/* Title */}
        <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: THEME.sage, fontWeight: 500, marginBottom: 10 }}>
          How It Works
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32, fontWeight: 300, color: THEME.textDark,
          marginBottom: 16, lineHeight: 1.2,
        }}>
          {feature.title}
        </h2>
        <p style={{ fontSize: 15, color: THEME.textMid, lineHeight: 1.7, marginBottom: 32 }}>
          {feature.intro}
        </p>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
          {feature.steps.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(124,158,142,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 600, color: THEME.sageDark,
                flexShrink: 0, marginTop: 2,
              }}>
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4, color: THEME.textDark }}>{step.title}</div>
                <div style={{ fontSize: 13, color: THEME.textMid, lineHeight: 1.6 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="btn-primary" style={{ width: "100%" }} onClick={() => { onClose(); onStart(); }}>
          {feature.cta}
        </button>
      </div>
    </div>
  );
}
