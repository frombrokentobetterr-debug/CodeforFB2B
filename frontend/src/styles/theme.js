// ─── Palette & Design System ─────────────────────────────────────────────────
export const THEME = {
  sage: "#7C9E8E",
  sageDark: "#5A7A6A",
  sageLight: "#A8C4B5",
  cream: "#FAF7F2",
  sand: "#EDE8DF",
  dustyRose: "#C4A09A",
  roseDark: "#9E7070",
  textDark: "#2C2C2C",
  textMid: "#5A5A5A",
  textLight: "#8A8A8A",
  white: "#FFFFFF",
  shadow: "rgba(124,158,142,0.15)",
};

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: ${THEME.cream};
    color: ${THEME.textDark};
    min-height: 100vh;
  }

  .app-container {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: rgba(250,247,242,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(124,158,142,0.15);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600; color: ${THEME.sageDark};
    cursor: pointer; letter-spacing: -0.3px;
  }
  .nav-logo span { color: ${THEME.dustyRose}; }
  .nav-links { display: flex; gap: 32px; align-items: center; }
  .nav-link {
    font-size: 14px; font-weight: 400; color: ${THEME.textMid};
    cursor: pointer; transition: color 0.2s; letter-spacing: 0.2px;
    background: none; border: none;
  }
  .nav-link:hover { color: ${THEME.sageDark}; }
  .nav-btn {
    background: ${THEME.sage}; color: white;
    border: none; border-radius: 100px;
    padding: 10px 24px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .nav-btn:hover { background: ${THEME.sageDark}; transform: translateY(-1px); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 120px 48px 80px;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(168,196,181,0.25) 0%, transparent 60%),
                radial-gradient(ellipse 50% 50% at 20% 80%, rgba(196,160,154,0.15) 0%, transparent 50%);
  }
  .hero-blob {
    position: absolute; border-radius: 50%;
    filter: blur(60px); opacity: 0.3; z-index: 0;
  }
  .hero-content { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; text-align: center; }
  .hero-tag {
    display: inline-block;
    background: rgba(124,158,142,0.12); border: 1px solid rgba(124,158,142,0.3);
    color: ${THEME.sageDark}; border-radius: 100px;
    padding: 6px 16px; font-size: 12px; font-weight: 500; letter-spacing: 0.8px;
    text-transform: uppercase; margin-bottom: 28px;
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(52px, 7vw, 80px); font-weight: 300; line-height: 1.05;
    color: ${THEME.textDark}; margin-bottom: 24px; letter-spacing: -1px;
  }
  .hero-title em { color: ${THEME.sage}; font-style: italic; }
  .hero-sub {
    font-size: 17px; line-height: 1.7; color: ${THEME.textMid};
    margin-bottom: 44px; font-weight: 300; max-width: 480px;
  }
  .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
  .btn-primary {
    background: ${THEME.sage}; color: white;
    border: none; border-radius: 100px;
    padding: 16px 36px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.25s; font-family: 'DM Sans', sans-serif;
    box-shadow: 0 4px 20px rgba(124,158,142,0.3);
  }
  .btn-primary:hover { background: ${THEME.sageDark}; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(124,158,142,0.4); }
  .btn-secondary {
    background: transparent; color: ${THEME.textDark};
    border: 1.5px solid rgba(44,44,44,0.2); border-radius: 100px;
    padding: 16px 36px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.25s; font-family: 'DM Sans', sans-serif;
  }
  .btn-secondary:hover { border-color: ${THEME.sage}; color: ${THEME.sage}; }
  .hero-stats { display: flex; gap: 48px; margin-top: 64px; justify-content: center; }
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px; font-weight: 300; color: ${THEME.textDark}; line-height: 1;
  }
  .stat-label { font-size: 13px; color: ${THEME.textLight}; margin-top: 4px; }

  /* SECTIONS */
  .section { padding: 96px 48px; }
  .section-tag {
    font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
    color: ${THEME.sage}; font-weight: 500; margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 52px); font-weight: 300; line-height: 1.2;
    color: ${THEME.textDark}; margin-bottom: 24px;
  }
  .section-sub { font-size: 16px; color: ${THEME.textMid}; line-height: 1.7; max-width: 540px; }

  /* FEATURES */
  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px; margin-top: 64px;
  }
  .feature-card {
    background: white; border-radius: 20px; padding: 36px 32px;
    border: 1px solid rgba(124,158,142,0.12);
    box-shadow: 0 2px 16px ${THEME.shadow};
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .feature-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px ${THEME.shadow}; }
  .feature-icon {
    width: 52px; height: 52px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; margin-bottom: 20px;
    background: rgba(124,158,142,0.1);
  }
  .feature-title { font-size: 17px; font-weight: 500; margin-bottom: 10px; }
  .feature-desc { font-size: 14px; color: ${THEME.textMid}; line-height: 1.6; }

  /* AUTH */
  .auth-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(44,44,44,0.5); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .auth-card {
    background: white; border-radius: 28px; padding: 52px 48px;
    max-width: 440px; width: 100%;
    box-shadow: 0 24px 80px rgba(0,0,0,0.15); position: relative;
  }
  .auth-close {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    border: none; background: ${THEME.sand};
    cursor: pointer; font-size: 18px; color: ${THEME.textMid};
    display: flex; align-items: center; justify-content: center;
  }
  .auth-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300; margin-bottom: 8px; }
  .auth-sub { font-size: 14px; color: ${THEME.textLight}; margin-bottom: 36px; }
  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 13px; font-weight: 500; color: ${THEME.textMid}; display: block; margin-bottom: 8px; }
  .form-input {
    width: 100%; padding: 14px 18px;
    border: 1.5px solid rgba(0,0,0,0.1); border-radius: 12px;
    font-size: 15px; font-family: 'DM Sans', sans-serif;
    background: ${THEME.cream}; color: ${THEME.textDark};
    transition: border-color 0.2s, box-shadow 0.2s; outline: none;
  }
  .form-input:focus { border-color: ${THEME.sage}; box-shadow: 0 0 0 3px rgba(124,158,142,0.15); }
  .form-btn {
    width: 100%; padding: 16px;
    background: ${THEME.sage}; color: white;
    border: none; border-radius: 12px;
    font-size: 16px; font-weight: 500; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: all 0.2s; margin-top: 8px;
  }
  .form-btn:hover { background: ${THEME.sageDark}; }
  .form-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .auth-switch { text-align: center; margin-top: 20px; font-size: 14px; color: ${THEME.textLight}; }
  .auth-switch button { color: ${THEME.sage}; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 500; }
  .error-msg { color: #E57373; font-size: 13px; margin-top: 8px; }

  /* ONBOARDING */
  .onboarding-overlay {
    position: fixed; inset: 0; z-index: 150;
    background: ${THEME.cream};
    display: flex; align-items: center; justify-content: center;
    padding: 24px; overflow-y: auto;
  }
  .onboarding-card {
    background: white; border-radius: 28px; padding: 60px 56px;
    max-width: 600px; width: 100%;
    box-shadow: 0 8px 48px ${THEME.shadow};
  }
  .progress-bar { height: 4px; background: ${THEME.sand}; border-radius: 4px; margin-bottom: 48px; }
  .progress-fill { height: 100%; background: ${THEME.sage}; border-radius: 4px; transition: width 0.4s ease; }
  .q-step { font-size: 12px; color: ${THEME.sage}; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
  .q-text { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; line-height: 1.3; margin-bottom: 36px; color: ${THEME.textDark}; }
  .q-options { display: flex; flex-direction: column; gap: 12px; }
  .q-option {
    padding: 16px 20px; border-radius: 14px;
    border: 1.5px solid rgba(0,0,0,0.08);
    cursor: pointer; transition: all 0.2s;
    font-size: 15px; color: ${THEME.textMid}; background: ${THEME.cream};
  }
  .q-option:hover { border-color: ${THEME.sage}; color: ${THEME.sageDark}; background: rgba(124,158,142,0.05); }
  .q-option.selected { border-color: ${THEME.sage}; background: rgba(124,158,142,0.1); color: ${THEME.sageDark}; font-weight: 500; }
  .q-textarea {
    width: 100%; padding: 16px 20px;
    border: 1.5px solid rgba(0,0,0,0.08); border-radius: 14px;
    font-size: 15px; font-family: 'DM Sans', sans-serif;
    background: ${THEME.cream}; color: ${THEME.textDark};
    resize: vertical; min-height: 100px; outline: none; transition: border-color 0.2s;
  }
  .q-textarea:focus { border-color: ${THEME.sage}; }
  .q-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 36px; }
  .q-back { background: none; border: none; color: ${THEME.textLight}; cursor: pointer; font-size: 14px; font-family: 'DM Sans', sans-serif; }
  .q-next {
    background: ${THEME.sage}; color: white; border: none; border-radius: 100px;
    padding: 14px 32px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .q-next:hover { background: ${THEME.sageDark}; }
  .q-next:disabled { opacity: 0.4; cursor: not-allowed; }

  /* GENERATING */
  .generating { text-align: center; padding: 60px 20px; }
  .spinner {
    width: 56px; height: 56px; border-radius: 50%;
    border: 3px solid ${THEME.sand}; border-top-color: ${THEME.sage};
    animation: spin 1s linear infinite; margin: 0 auto 32px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .gen-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 300; margin-bottom: 12px; }
  .gen-sub { font-size: 15px; color: ${THEME.textMid}; }

  /* DASHBOARD */
  .dashboard { min-height: 100vh; padding: 100px 48px 60px; max-width: 1100px; margin: 0 auto; }
  .dashboard-header { margin-bottom: 48px; }
  .dashboard-greeting { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 48px); font-weight: 300; margin-bottom: 8px; }
  .dashboard-greeting span { color: ${THEME.sage}; font-style: italic; }
  .dashboard-sub { font-size: 15px; color: ${THEME.textMid}; }
  .healing-phase {
    background: linear-gradient(135deg, rgba(124,158,142,0.15) 0%, rgba(196,160,154,0.1) 100%);
    border: 1px solid rgba(124,158,142,0.2); border-radius: 24px; padding: 36px 40px;
    margin-bottom: 32px; position: relative; overflow: hidden;
  }
  .phase-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${THEME.sage}; font-weight: 500; margin-bottom: 8px; }
  .phase-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 12px; }
  .phase-summary { font-size: 15px; color: ${THEME.textMid}; line-height: 1.7; max-width: 600px; }
  .phase-insight { margin-top: 20px; padding: 16px 20px; background: rgba(255,255,255,0.7); border-radius: 14px; font-size: 14px; color: ${THEME.sageDark}; font-style: italic; line-height: 1.6; }
  .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }
  @media (max-width: 720px) { .dash-grid { grid-template-columns: 1fr; } }
  .dash-card { background: white; border-radius: 22px; padding: 32px; border: 1px solid rgba(124,158,142,0.12); box-shadow: 0 2px 16px ${THEME.shadow}; }
  .dash-card-label { font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; color: ${THEME.textLight}; font-weight: 500; margin-bottom: 16px; }
  .dash-card-title { font-size: 18px; font-weight: 500; margin-bottom: 8px; }
  .dash-card-desc { font-size: 14px; color: ${THEME.textMid}; line-height: 1.6; margin-bottom: 20px; }
  .card-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .card-btn-primary { background: ${THEME.sage}; color: white; }
  .card-btn-primary:hover { background: ${THEME.sageDark}; transform: translateY(-1px); }
  .card-btn-outline { background: transparent; color: ${THEME.textDark}; border: 1.5px solid rgba(0,0,0,0.15); }
  .card-btn-outline:hover { border-color: ${THEME.sage}; color: ${THEME.sage}; }
  .card-btn-rose { background: ${THEME.dustyRose}; color: white; }
  .card-btn-rose:hover { background: ${THEME.roseDark}; transform: translateY(-1px); }
  .focus-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .focus-chip { padding: 6px 14px; border-radius: 100px; background: rgba(124,158,142,0.1); color: ${THEME.sageDark}; font-size: 13px; font-weight: 500; }

  /* EVENTS */
  .events-page { min-height: 100vh; padding: 100px 48px 60px; max-width: 1100px; margin: 0 auto; }
  .events-header { margin-bottom: 48px; }
  .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
  .event-card { background: white; border-radius: 22px; overflow: hidden; border: 1px solid rgba(124,158,142,0.12); box-shadow: 0 2px 16px ${THEME.shadow}; transition: transform 0.25s, box-shadow 0.25s; }
  .event-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px ${THEME.shadow}; }
  .event-card-img { height: 140px; display: flex; align-items: center; justify-content: center; font-size: 48px; }
  .event-card-body { padding: 28px 28px 32px; }
  .event-tag { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 12px; }
  .tag-workshop { background: rgba(124,158,142,0.12); color: ${THEME.sageDark}; }
  .tag-online { background: rgba(196,160,154,0.15); color: ${THEME.roseDark}; }
  .tag-group { background: rgba(168,196,181,0.2); color: ${THEME.sageDark}; }
  .event-title { font-size: 18px; font-weight: 500; margin-bottom: 8px; }
  .event-desc { font-size: 14px; color: ${THEME.textMid}; line-height: 1.6; margin-bottom: 20px; }
  .event-meta { display: flex; gap: 16px; margin-bottom: 20px; }
  .event-meta-item { font-size: 13px; color: ${THEME.textLight}; display: flex; gap: 4px; align-items: center; }
  .event-footer { display: flex; align-items: center; justify-content: space-between; }
  .event-price { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: ${THEME.textDark}; }

  /* STRIPE MODAL */
  .modal-overlay { position: fixed; inset: 0; z-index: 300; background: rgba(44,44,44,0.5); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .modal-card { background: white; border-radius: 28px; padding: 48px; max-width: 480px; width: 100%; box-shadow: 0 24px 80px rgba(0,0,0,0.15); }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; margin-bottom: 6px; }
  .modal-sub { font-size: 14px; color: ${THEME.textLight}; margin-bottom: 32px; }
  .stripe-field { margin-bottom: 16px; }
  .stripe-field label { font-size: 13px; font-weight: 500; color: ${THEME.textMid}; display: block; margin-bottom: 6px; }
  .stripe-field input { width: 100%; padding: 14px 18px; border: 1.5px solid rgba(0,0,0,0.1); border-radius: 12px; font-size: 15px; font-family: 'DM Sans', sans-serif; background: ${THEME.cream}; outline: none; transition: border-color 0.2s; }
  .stripe-field input:focus { border-color: ${THEME.sage}; }
  .stripe-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .stripe-secure { display: flex; align-items: center; gap: 8px; font-size: 12px; color: ${THEME.textLight}; margin: 16px 0; }
  .stripe-badge { background: ${THEME.sand}; border-radius: 8px; padding: 6px 12px; font-size: 12px; color: ${THEME.textMid}; font-weight: 500; }
  .modal-btns { display: flex; gap: 12px; margin-top: 24px; }
  .modal-cancel { flex: 1; padding: 14px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.1); background: transparent; font-size: 15px; cursor: pointer; font-family: 'DM Sans', sans-serif; color: ${THEME.textMid}; }
  .modal-pay { flex: 2; padding: 14px; border-radius: 12px; background: ${THEME.sage}; color: white; border: none; font-size: 15px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .modal-pay:hover { background: ${THEME.sageDark}; }
  .modal-pay:disabled { opacity: 0.6; cursor: not-allowed; }
  .success-box { text-align: center; padding: 40px 20px; }
  .success-icon { font-size: 56px; margin-bottom: 20px; }
  .success-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; margin-bottom: 10px; }
  .success-desc { font-size: 15px; color: ${THEME.textMid}; line-height: 1.6; }

  /* BLOG */
  .blog-page { min-height: 100vh; padding: 100px 48px 80px; max-width: 1100px; margin: 0 auto; }
  .blog-header { margin-bottom: 56px; text-align: center; }
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; }
  .blog-card { background: white; border-radius: 22px; overflow: hidden; border: 1px solid rgba(124,158,142,0.12); box-shadow: 0 2px 16px rgba(124,158,142,0.1); transition: transform 0.25s, box-shadow 0.25s; cursor: pointer; }
  .blog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(124,158,142,0.18); }
  .blog-card-img { height: 130px; display: flex; align-items: center; justify-content: center; font-size: 52px; background: rgba(124,158,142,0.06); }
  .blog-card-body { padding: 26px 28px 30px; }
  .blog-tag { display: inline-block; padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 12px; }
  .blog-card-title { font-size: 17px; font-weight: 500; line-height: 1.4; margin-bottom: 10px; color: #2C2C2C; }
  .blog-card-summary { font-size: 13px; color: #5A5A5A; line-height: 1.6; margin-bottom: 18px; }
  .blog-card-meta { display: flex; gap: 16px; font-size: 12px; color: #8A8A8A; }
  .article-page { min-height: 100vh; padding: 100px 48px 80px; max-width: 740px; margin: 0 auto; }
  .article-back { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; color: #7C9E8E; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; margin-bottom: 36px; padding: 0; }
  .article-back:hover { color: #5A7A6A; }
  .article-tag { display: inline-block; padding: 4px 14px; border-radius: 100px; font-size: 11px; font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 20px; }
  .article-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4vw, 48px); font-weight: 300; line-height: 1.2; color: #2C2C2C; margin-bottom: 16px; }
  .article-meta { display: flex; gap: 20px; font-size: 13px; color: #8A8A8A; margin-bottom: 40px; }
  .article-summary { font-size: 18px; line-height: 1.7; color: #5A5A5A; border-left: 3px solid #7C9E8E; padding-left: 20px; margin-bottom: 44px; font-style: italic; }
  .article-section { margin-bottom: 36px; }
  .article-heading { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: #2C2C2C; margin-bottom: 14px; }
  .article-body { font-size: 16px; line-height: 1.8; color: #5A5A5A; }
  .article-divider { height: 1px; background: rgba(124,158,142,0.15); margin: 48px 0; }
  .article-cta { background: linear-gradient(135deg, rgba(124,158,142,0.12) 0%, rgba(196,160,154,0.1) 100%); border-radius: 20px; padding: 36px 40px; text-align: center; border: 1px solid rgba(124,158,142,0.2); }
  .article-cta-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; margin-bottom: 10px; }
  .article-cta-sub { font-size: 14px; color: #5A5A5A; margin-bottom: 20px; line-height: 1.6; }

  /* DECORATIVE */
  .divider { height: 1px; background: rgba(124,158,142,0.15); margin: 0 48px; }

  @media (max-width: 768px) {
    .nav { padding: 16px 24px; }
    .hero { padding: 100px 24px 60px; }
    .hero-stats { gap: 32px; }
    .section { padding: 64px 24px; }
    .dashboard { padding: 100px 24px 60px; }
    .events-page { padding: 100px 24px 60px; }
    .blog-page { padding: 100px 24px 60px; }
    .article-page { padding: 100px 24px 60px; }
    .auth-card { padding: 40px 32px; }
    .onboarding-card { padding: 40px 28px; }
  }
`;
