import openDoorIcon from '../../assets/icons/open-door.svg';

const PALETTE = {
  bg:         "#1e1a17",   // deep charcoal — grounded, darker than page body
  border:     "rgba(255,255,255,0.08)",
  cream:      "#f4ede3",
  sage:       "#7a9e87",
  terracotta: "#c4623a",
  muted:      "rgba(244,237,227,0.5)",
};

const NAV_LINKS = [
  { label: "About",          page: "about"   },
  { label: "Events",         page: "events"  },
  { label: "Journal",        page: "blog"    },
  { label: "Privacy Policy", page: "privacy" },
  { label: "Terms",          page: "terms"   },
];

export default function Footer({ setPage, onStart }) {
  return (
    <footer style={{
      background: PALETTE.bg,
      color: PALETTE.cream,
      padding: "64px 48px 40px",
      marginTop: "auto",
    }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>

        {/* ── Top row: brand + CTA ── */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 40,
          paddingBottom: 40,
          borderBottom: `1px solid ${PALETTE.border}`,
        }}>
          {/* Brand block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img
                src={openDoorIcon}
                alt=""
                style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }}
              />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                fontWeight: 600,
                color: PALETTE.cream,
                letterSpacing: "-0.2px",
              }}>
                From <span style={{ color: PALETTE.terracotta }}>Broken</span> to Better
              </span>
            </div>
            <p style={{
              fontSize: 13,
              color: PALETTE.muted,
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              fontWeight: 400,
              margin: 0,
            }}>
              Walk your grief. Rebuild.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            style={{
              background: "transparent",
              border: `1.5px solid ${PALETTE.sage}`,
              borderRadius: 100,
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 500,
              color: PALETTE.sage,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              alignSelf: "center",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = PALETTE.sage;
              e.currentTarget.style.color = "#1e1a17";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = PALETTE.sage;
            }}
          >
            Begin Your Journey →
          </button>
        </div>

        {/* ── Nav links row ── */}
        <nav style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px 32px",
          padding: "32px 0",
          borderBottom: `1px solid ${PALETTE.border}`,
        }}>
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setPage?.(page)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontSize: 14,
                color: PALETTE.muted,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = PALETTE.cream; }}
              onMouseLeave={e => { e.currentTarget.style.color = PALETTE.muted; }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* ── Copyright row ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          paddingTop: 28,
        }}>
          <p style={{ margin: 0, fontSize: 13, color: PALETTE.muted }}>
            © {new Date().getFullYear()} From Broken to Better. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "rgba(244,237,227,0.25)" }}>
            Made with care for those who are healing.
          </p>
        </div>

      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 600px) {
          footer { padding: 48px 24px 32px !important; }
          footer > div > div:first-child {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
