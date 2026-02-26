import { useState, useEffect, useRef } from "react";

// ─── Palette & Design System ──────────────────────────────────────────────────
const THEME = {
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

// ─── Mock DB (in-memory) ──────────────────────────────────────────────────────
let mockDB = { users: {}, sessions: {} };
let currentUserId = null;

// ─── Mock AI API ──────────────────────────────────────────────────────────────
async function generateHealingPath(answers) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are a compassionate healing coach for people going through separation or divorce. Based on these questionnaire answers, provide a brief emotional assessment and personalized healing path.

Answers:
1. Time since separation: ${answers[0]}
2. Biggest challenge: ${answers[1]}
3. Support system: ${answers[2]}
4. Current emotional state: ${answers[3]}
5. Healing goals: ${answers[4]}
6. Self-care practices: ${answers[5]}

Respond ONLY in this exact JSON format (no markdown, no backticks):
{
  "summary": "2-3 warm, empathetic sentences about their situation",
  "phase": "one of: Stabilizing | Processing | Rebuilding | Thriving",
  "focusAreas": ["area1", "area2", "area3"],
  "recommendedEvent": "one specific event name from: Inner Peace Workshop | Co-Parenting with Grace | Rediscovering You | Moving Forward Together | Healing Through Grief",
  "insight": "one personalized encouraging insight sentence",
  "nextStep": "one concrete action they can take today"
}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content.map(b => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalCSS = `
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
    display: flex; align-items: center;
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
  .hero-content { position: relative; z-index: 1; max-width: 620px; }
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
  .hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
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

  .hero-stats {
    display: flex; gap: 48px; margin-top: 64px;
  }
  .stat-item {}
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 42px; font-weight: 300; color: ${THEME.textDark}; line-height: 1;
  }
  .stat-label { font-size: 13px; color: ${THEME.textLight}; margin-top: 4px; }

  /* MISSION SECTION */
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

  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 24px; margin-top: 64px;
  }
  .feature-card {
    background: white; border-radius: 20px;
    padding: 36px 32px;
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
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .auth-card {
    background: white; border-radius: 28px;
    padding: 52px 48px; max-width: 440px; width: 100%;
    box-shadow: 0 24px 80px rgba(0,0,0,0.15);
    position: relative;
  }
  .auth-close {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    border: none; background: ${THEME.sand};
    cursor: pointer; font-size: 18px; color: ${THEME.textMid};
    display: flex; align-items: center; justify-content: center;
  }
  .auth-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px; font-weight: 300; margin-bottom: 8px;
  }
  .auth-sub { font-size: 14px; color: ${THEME.textLight}; margin-bottom: 36px; }
  .form-group { margin-bottom: 20px; }
  .form-label { font-size: 13px; font-weight: 500; color: ${THEME.textMid}; display: block; margin-bottom: 8px; }
  .form-input {
    width: 100%; padding: 14px 18px;
    border: 1.5px solid rgba(0,0,0,0.1); border-radius: 12px;
    font-size: 15px; font-family: 'DM Sans', sans-serif;
    background: ${THEME.cream}; color: ${THEME.textDark};
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
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
    background: white; border-radius: 28px;
    padding: 60px 56px; max-width: 600px; width: 100%;
    box-shadow: 0 8px 48px ${THEME.shadow};
  }
  .progress-bar {
    height: 4px; background: ${THEME.sand}; border-radius: 4px; margin-bottom: 48px;
  }
  .progress-fill {
    height: 100%; background: ${THEME.sage}; border-radius: 4px;
    transition: width 0.4s ease;
  }
  .q-step { font-size: 12px; color: ${THEME.sage}; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px; }
  .q-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px; font-weight: 300; line-height: 1.3;
    margin-bottom: 36px; color: ${THEME.textDark};
  }
  .q-options { display: flex; flex-direction: column; gap: 12px; }
  .q-option {
    padding: 16px 20px; border-radius: 14px;
    border: 1.5px solid rgba(0,0,0,0.08);
    cursor: pointer; transition: all 0.2s;
    font-size: 15px; color: ${THEME.textMid};
    background: ${THEME.cream};
  }
  .q-option:hover { border-color: ${THEME.sage}; color: ${THEME.sageDark}; background: rgba(124,158,142,0.05); }
  .q-option.selected { border-color: ${THEME.sage}; background: rgba(124,158,142,0.1); color: ${THEME.sageDark}; font-weight: 500; }
  .q-textarea {
    width: 100%; padding: 16px 20px;
    border: 1.5px solid rgba(0,0,0,0.08); border-radius: 14px;
    font-size: 15px; font-family: 'DM Sans', sans-serif;
    background: ${THEME.cream}; color: ${THEME.textDark};
    resize: vertical; min-height: 100px; outline: none;
    transition: border-color 0.2s;
  }
  .q-textarea:focus { border-color: ${THEME.sage}; }
  .q-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 36px; }
  .q-back { background: none; border: none; color: ${THEME.textLight}; cursor: pointer; font-size: 14px; font-family: 'DM Sans', sans-serif; }
  .q-next {
    background: ${THEME.sage}; color: white;
    border: none; border-radius: 100px;
    padding: 14px 32px; font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
  }
  .q-next:hover { background: ${THEME.sageDark}; }
  .q-next:disabled { opacity: 0.4; cursor: not-allowed; }

  /* GENERATING */
  .generating {
    text-align: center; padding: 60px 20px;
  }
  .spinner {
    width: 56px; height: 56px; border-radius: 50%;
    border: 3px solid ${THEME.sand};
    border-top-color: ${THEME.sage};
    animation: spin 1s linear infinite;
    margin: 0 auto 32px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .gen-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px; font-weight: 300; margin-bottom: 12px;
  }
  .gen-sub { font-size: 15px; color: ${THEME.textMid}; }

  /* DASHBOARD */
  .dashboard {
    min-height: 100vh;
    padding: 100px 48px 60px;
    max-width: 1100px; margin: 0 auto;
  }
  .dashboard-header { margin-bottom: 48px; }
  .dashboard-greeting {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4vw, 48px); font-weight: 300; margin-bottom: 8px;
  }
  .dashboard-greeting span { color: ${THEME.sage}; font-style: italic; }
  .dashboard-sub { font-size: 15px; color: ${THEME.textMid}; }

  .healing-phase {
    background: linear-gradient(135deg, rgba(124,158,142,0.15) 0%, rgba(196,160,154,0.1) 100%);
    border: 1px solid rgba(124,158,142,0.2);
    border-radius: 24px; padding: 36px 40px;
    margin-bottom: 32px; position: relative; overflow: hidden;
  }
  .phase-label { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${THEME.sage}; font-weight: 500; margin-bottom: 8px; }
  .phase-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 12px; }
  .phase-summary { font-size: 15px; color: ${THEME.textMid}; line-height: 1.7; max-width: 600px; }
  .phase-insight {
    margin-top: 20px; padding: 16px 20px;
    background: rgba(255,255,255,0.7); border-radius: 14px;
    font-size: 14px; color: ${THEME.sageDark}; font-style: italic; line-height: 1.6;
  }

  .dash-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 24px; margin-bottom: 32px;
  }
  @media (max-width: 720px) { .dash-grid { grid-template-columns: 1fr; } }
  
  .dash-card {
    background: white; border-radius: 22px;
    padding: 32px; border: 1px solid rgba(124,158,142,0.12);
    box-shadow: 0 2px 16px ${THEME.shadow};
  }
  .dash-card-label { font-size: 11px; letter-spacing: 1.2px; text-transform: uppercase; color: ${THEME.textLight}; font-weight: 500; margin-bottom: 16px; }
  .dash-card-title { font-size: 18px; font-weight: 500; margin-bottom: 8px; }
  .dash-card-desc { font-size: 14px; color: ${THEME.textMid}; line-height: 1.6; margin-bottom: 20px; }
  .card-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 100px;
    font-size: 14px; font-weight: 500; cursor: pointer;
    border: none; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .card-btn-primary { background: ${THEME.sage}; color: white; }
  .card-btn-primary:hover { background: ${THEME.sageDark}; transform: translateY(-1px); }
  .card-btn-outline { background: transparent; color: ${THEME.textDark}; border: 1.5px solid rgba(0,0,0,0.15); }
  .card-btn-outline:hover { border-color: ${THEME.sage}; color: ${THEME.sage}; }
  .card-btn-rose { background: ${THEME.dustyRose}; color: white; }
  .card-btn-rose:hover { background: ${THEME.roseDark}; transform: translateY(-1px); }

  .focus-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .focus-chip {
    padding: 6px 14px; border-radius: 100px;
    background: rgba(124,158,142,0.1); color: ${THEME.sageDark};
    font-size: 13px; font-weight: 500;
  }

  /* EVENTS PAGE */
  .events-page {
    min-height: 100vh;
    padding: 100px 48px 60px;
    max-width: 1100px; margin: 0 auto;
  }
  .events-header { margin-bottom: 48px; }
  .events-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
  .event-card {
    background: white; border-radius: 22px;
    overflow: hidden; border: 1px solid rgba(124,158,142,0.12);
    box-shadow: 0 2px 16px ${THEME.shadow};
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .event-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px ${THEME.shadow}; }
  .event-card-img {
    height: 140px; display: flex; align-items: center; justify-content: center;
    font-size: 48px;
  }
  .event-card-body { padding: 28px 28px 32px; }
  .event-tag {
    display: inline-block; padding: 4px 12px; border-radius: 100px;
    font-size: 11px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .tag-workshop { background: rgba(124,158,142,0.12); color: ${THEME.sageDark}; }
  .tag-online { background: rgba(196,160,154,0.15); color: ${THEME.roseDark}; }
  .tag-group { background: rgba(168,196,181,0.2); color: ${THEME.sageDark}; }
  .event-title { font-size: 18px; font-weight: 500; margin-bottom: 8px; }
  .event-desc { font-size: 14px; color: ${THEME.textMid}; line-height: 1.6; margin-bottom: 20px; }
  .event-meta { display: flex; gap: 16px; margin-bottom: 20px; }
  .event-meta-item { font-size: 13px; color: ${THEME.textLight}; display: flex; gap: 4px; align-items: center; }
  .event-footer { display: flex; align-items: center; justify-content: space-between; }
  .event-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 300; color: ${THEME.textDark};
  }

  /* STRIPE MODAL */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(44,44,44,0.5); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .modal-card {
    background: white; border-radius: 28px;
    padding: 48px; max-width: 480px; width: 100%;
    box-shadow: 0 24px 80px rgba(0,0,0,0.15);
  }
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px; font-weight: 300; margin-bottom: 6px;
  }
  .modal-sub { font-size: 14px; color: ${THEME.textLight}; margin-bottom: 32px; }
  .stripe-field { margin-bottom: 16px; }
  .stripe-field label { font-size: 13px; font-weight: 500; color: ${THEME.textMid}; display: block; margin-bottom: 6px; }
  .stripe-field input {
    width: 100%; padding: 14px 18px;
    border: 1.5px solid rgba(0,0,0,0.1); border-radius: 12px;
    font-size: 15px; font-family: 'DM Sans', sans-serif;
    background: ${THEME.cream}; outline: none; transition: border-color 0.2s;
  }
  .stripe-field input:focus { border-color: ${THEME.sage}; }
  .stripe-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .stripe-secure {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: ${THEME.textLight}; margin: 16px 0;
  }
  .stripe-badge {
    background: ${THEME.sand}; border-radius: 8px;
    padding: 6px 12px; font-size: 12px; color: ${THEME.textMid};
    font-weight: 500;
  }
  .modal-btns { display: flex; gap: 12px; margin-top: 24px; }
  .modal-cancel {
    flex: 1; padding: 14px; border-radius: 12px;
    border: 1.5px solid rgba(0,0,0,0.1); background: transparent;
    font-size: 15px; cursor: pointer; font-family: 'DM Sans', sans-serif;
    color: ${THEME.textMid};
  }
  .modal-pay {
    flex: 2; padding: 14px; border-radius: 12px;
    background: ${THEME.sage}; color: white; border: none;
    font-size: 15px; font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .modal-pay:hover { background: ${THEME.sageDark}; }
  .modal-pay:disabled { opacity: 0.6; cursor: not-allowed; }
  .success-box {
    text-align: center; padding: 40px 20px;
  }
  .success-icon { font-size: 56px; margin-bottom: 20px; }
  .success-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; margin-bottom: 10px; }
  .success-desc { font-size: 15px; color: ${THEME.textMid}; line-height: 1.6; }

  /* DECORATIVE */
  .leaf {
    position: absolute; opacity: 0.06; pointer-events: none;
    font-size: 180px; z-index: 0;
  }
  
  .divider {
    height: 1px; background: rgba(124,158,142,0.15);
    margin: 0 48px;
  }

  @media (max-width: 768px) {
    .nav { padding: 16px 24px; }
    .hero { padding: 100px 24px 60px; }
    .hero-stats { gap: 32px; }
    .section { padding: 64px 24px; }
    .dashboard { padding: 100px 24px 60px; }
    .events-page { padding: 100px 24px 60px; }
    .auth-card { padding: 40px 32px; }
    .onboarding-card { padding: 40px 28px; }
  }
`;

// ─── Questions ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    text: "How long ago did your separation or divorce occur?",
    options: ["Less than 3 months ago", "3–6 months ago", "6–12 months ago", "1–2 years ago", "More than 2 years ago"],
  },
  {
    text: "What feels like your biggest challenge right now?",
    options: ["Managing overwhelming emotions", "Co-parenting and family dynamics", "Financial stress and uncertainty", "Loneliness and loss of identity", "Rebuilding my social life"],
  },
  {
    text: "How would you describe your current support system?",
    options: ["I feel very alone — limited support", "A few close people but not enough", "I have a decent support network", "I'm well-supported but need more", "I'm looking for professional guidance"],
  },
  {
    text: "In one word, how do you feel emotionally most days?",
    type: "text",
    placeholder: "e.g., anxious, hopeful, numb, exhausted...",
  },
  {
    text: "What's your main hope for your healing journey?",
    options: ["Find inner peace and calm", "Rebuild confidence and self-worth", "Learn healthy co-parenting", "Open to love again someday", "Rediscover purpose and joy"],
  },
  {
    text: "What self-care practices do you already use, if any?",
    options: ["Journaling or reflection", "Exercise or movement", "Therapy or counseling", "Spiritual practice", "Nothing yet — I'm just starting"],
  },
];

const EVENTS = [
  {
    id: 1, emoji: "🌿", title: "Inner Peace Workshop",
    tag: "workshop", tagLabel: "Workshop",
    desc: "A full-day immersive workshop to rediscover calm and center yourself through guided mindfulness, breathwork, and journaling.",
    date: "Mar 15, 2026", time: "10am–4pm", format: "In-Person",
    price: "$149", priceNum: 149,
    spots: "12 spots left",
  },
  {
    id: 2, emoji: "🤝", title: "Co-Parenting with Grace",
    tag: "online", tagLabel: "Online",
    desc: "A 4-week virtual course helping separated parents build effective, low-conflict co-parenting relationships for their children's wellbeing.",
    date: "Apr 1, 2026", time: "7–8:30pm EST", format: "Online",
    price: "$199", priceNum: 199,
    spots: "8 spots left",
  },
  {
    id: 3, emoji: "✨", title: "Rediscovering You",
    tag: "group", tagLabel: "Group",
    desc: "A supportive 6-week group program focused on rebuilding identity, confidence, and purpose after the end of a long-term relationship.",
    date: "Mar 22, 2026", time: "Saturdays 2–4pm", format: "Hybrid",
    price: "$249", priceNum: 249,
    spots: "5 spots left",
  },
  {
    id: 4, emoji: "💬", title: "Moving Forward Together",
    tag: "group", tagLabel: "Support Group",
    desc: "Weekly virtual support circles — a safe, guided space to share, listen, and grow with others who truly understand what you're going through.",
    date: "Every Tuesday", time: "8–9pm EST", format: "Online",
    price: "$29/mo", priceNum: 29,
    spots: "Open",
  },
  {
    id: 5, emoji: "🌸", title: "Healing Through Grief",
    tag: "workshop", tagLabel: "Workshop",
    desc: "A trauma-informed 2-day retreat addressing the grief of relationship loss — with somatic practices, group sharing, and expert guidance.",
    date: "May 3–4, 2026", time: "9am–5pm", format: "In-Person",
    price: "$349", priceNum: 349,
    spots: "16 spots left",
  },
  {
    id: 6, emoji: "❤️", title: "1:1 Healing Session",
    tag: "online", tagLabel: "Private",
    desc: "Book a private 60-minute session with one of our certified healing coaches. Personalized, compassionate, and completely confidential.",
    date: "Flexible scheduling", time: "Your choice", format: "Video Call",
    price: "$95", priceNum: 95,
    spots: "Available now",
  },
];

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing"); // landing | dashboard | events
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // login | signup
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState(null);
  const [healingData, setHealingData] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);

  useEffect(() => {
    // inject styles
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
    const existing = mockDB.users[userData.email];
    if (existing?.healingData) {
      setHealingData(existing.healingData);
      setPage("dashboard");
    } else {
      setShowOnboarding(true);
    }
  };

  const handleSignup = (userData) => {
    mockDB.users[userData.email] = userData;
    setUser(userData);
    setShowAuth(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = (data) => {
    if (user) {
      mockDB.users[user.email] = { ...mockDB.users[user.email], healingData: data };
    }
    setHealingData(data);
    setShowOnboarding(false);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUser(null); setHealingData(null); setPage("landing");
  };

  return (
    <div className="app-container">
      <Nav
        user={user}
        page={page}
        setPage={setPage}
        onLogin={() => { setAuthMode("login"); setShowAuth(true); }}
        onSignup={() => { setAuthMode("signup"); setShowAuth(true); }}
        onLogout={handleLogout}
      />

      {page === "landing" && <LandingPage onStart={() => { setAuthMode("signup"); setShowAuth(true); }} onSignin={() => { setAuthMode("login"); setShowAuth(true); }} />}
      {page === "dashboard" && user && healingData && <Dashboard user={user} data={healingData} setPage={setPage} onBook={setBookingEvent} />}
      {page === "events" && <EventsPage onBook={setBookingEvent} user={user} onLogin={() => { setAuthMode("login"); setShowAuth(true); }} />}

      {showAuth && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onClose={() => setShowAuth(false)}
        />
      )}

      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} userName={user?.name} />
      )}

      {bookingEvent && (
        <BookingModal event={bookingEvent} onClose={() => setBookingEvent(null)} />
      )}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav({ user, page, setPage, onLogin, onSignup, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("landing")}>
        From <span>Broken</span> to Better
      </div>
      <div className="nav-links">
        <button className="nav-link" onClick={() => setPage("events")}>Events</button>
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

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onStart, onSignin }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-blob" style={{ width: 400, height: 400, background: THEME.sageLight, top: "10%", right: "5%" }} />
        <div className="hero-blob" style={{ width: 250, height: 250, background: THEME.dustyRose, bottom: "15%", right: "25%" }} />
        <div className="hero-content">
          <div className="hero-tag">A safe space to heal & grow</div>
          <h1 className="hero-title">
            Your healing<br />journey starts<br /><em>here.</em>
          </h1>
          <p className="hero-sub">
            Separation and divorce are some of life's hardest transitions. We walk with you — with compassion, community, and expert guidance — toward a life that feels whole again.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={onStart}>Begin Your Journey →</button>
            <button className="btn-secondary" onClick={onSignin}>I have an account</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">4,200+</div>
              <div className="stat-label">Lives touched</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">96%</div>
              <div className="stat-label">Feel less alone</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">120+</div>
              <div className="stat-label">Events hosted</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* MISSION */}
      <section className="section" style={{ background: "white" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 className="section-title">You're not starting over.<br />You're starting <em style={{ fontStyle: "italic", color: THEME.sage }}>fresh.</em></h2>
              <p className="section-sub">
                We believe that the end of a relationship is not the end of your story. It's a profound, painful transition — and also an invitation to know yourself more deeply and live more authentically. From Broken to Better exists to walk with you through every step of that transformation.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {["Judgment-free space to process and grieve", "AI-personalized healing paths based on your needs", "Evidence-based workshops and expert-led sessions", "A warm, supportive community of people who understand"].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: `rgba(124,158,142,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <span style={{ fontSize: 14, color: THEME.sage }}>✓</span>
                  </div>
                  <p style={{ fontSize: 15, color: THEME.textMid, lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* HOW IT WORKS */}
      <section className="section">
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-tag" style={{ display: "inline-block" }}>How It Works</div>
            <h2 className="section-title" style={{ maxWidth: 500, margin: "0 auto" }}>A thoughtful approach to your healing</h2>
          </div>
          <div className="features-grid">
            {[
              { icon: "🧭", title: "AI Emotional Assessment", desc: "Answer 6 compassionate questions. Our AI listens deeply and maps where you are in your healing journey." },
              { icon: "🗺️", title: "Personalized Healing Path", desc: "Receive a custom roadmap — curated events, resources, and coaching recommendations just for you." },
              { icon: "🌿", title: "Workshops & Events", desc: "Join intimate workshops, support groups, and retreats led by certified therapists and healing coaches." },
              { icon: "💬", title: "Private 1:1 Sessions", desc: "Book confidential sessions with our specialists whenever you need personal, focused support." },
              { icon: "🤝", title: "Healing Community", desc: "Connect with others who truly understand. Share, listen, and grow together in a moderated, safe space." },
              { icon: "✨", title: "Track Your Growth", desc: "Your dashboard evolves with you — celebrating milestones and gently guiding your next steps forward." },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 48px", background: `linear-gradient(135deg, ${THEME.sageDark} 0%, ${THEME.sage} 100%)`, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 300, color: "white", marginBottom: 20, lineHeight: 1.2 }}>
            You deserve to feel whole again.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", marginBottom: 40, lineHeight: 1.7 }}>
            Take the first step today. It only takes a few minutes to receive your personalized healing path.
          </p>
          <button className="btn-primary" onClick={onStart} style={{ background: "white", color: THEME.sageDark, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}>
            Start for Free — No Credit Card Needed
          </button>
        </div>
      </section>
    </>
  );
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────
function AuthModal({ mode, setMode, onLogin, onSignup, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !name) { setError("Please enter your name."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 800));
    
    if (mode === "login") {
      const existing = mockDB.users[email];
      if (!existing || existing.password !== password) {
        setError("Invalid email or password."); setLoading(false); return;
      }
      onLogin(existing);
    } else {
      if (mockDB.users[email]) { setError("An account with this email already exists."); setLoading(false); return; }
      const userData = { name, email, password, createdAt: new Date().toISOString() };
      onSignup(userData);
    }
    setLoading(false);
  };

  return (
    <div className="auth-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="auth-card">
        <button className="auth-close" onClick={onClose}>×</button>
        <h2 className="auth-title">{mode === "login" ? "Welcome back" : "Begin healing"}</h2>
        <p className="auth-sub">{mode === "login" ? "Sign in to continue your journey." : "Create your free account to get started."}</p>
        
        {mode === "signup" && (
          <div className="form-group">
            <label className="form-label">Your name</label>
            <input className="form-input" placeholder="First name" value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
        </div>
        {error && <p className="error-msg">{error}</p>}
        <button className="form-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
        <p className="auth-switch">
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up free" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── Onboarding Flow ──────────────────────────────────────────────────────────
function OnboardingFlow({ onComplete, userName }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(6).fill(""));
  const [generating, setGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState("Reflecting on your answers...");

  const q = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  const handleSelect = (val) => {
    const updated = [...answers]; updated[step] = val; setAnswers(updated);
  };

  const canNext = answers[step].trim().length > 0;

  const handleNext = async () => {
    if (step < QUESTIONS.length - 1) { setStep(s => s + 1); return; }
    // last question — generate
    setGenerating(true);
    const statuses = ["Reflecting on your answers...", "Understanding your journey...", "Crafting your healing path...", "Almost ready..."];
    let i = 0;
    const interval = setInterval(() => { i = (i + 1) % statuses.length; setGenStatus(statuses[i]); }, 2000);
    try {
      const data = await generateHealingPath(answers);
      clearInterval(interval);
      onComplete(data);
    } catch (e) {
      clearInterval(interval);
      // Fallback data if API fails
      onComplete({
        summary: `Thank you for sharing, ${userName || "friend"}. Your courage in taking this step is the beginning of everything. Based on your responses, it's clear you're carrying a lot — and you don't have to carry it alone.`,
        phase: "Processing",
        focusAreas: ["Emotional regulation", "Building support systems", "Rediscovering identity"],
        recommendedEvent: "Inner Peace Workshop",
        insight: "Healing is not linear, but every honest step forward — even a small one — counts deeply.",
        nextStep: "Set aside 10 minutes today for quiet reflection with a journal."
      });
    }
  };

  if (generating) {
    return (
      <div className="onboarding-overlay">
        <div className="onboarding-card generating">
          <div className="spinner" />
          <h2 className="gen-title">Creating your healing path</h2>
          <p className="gen-sub">{genStatus}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="q-step">Question {step + 1} of {QUESTIONS.length}</div>
        <h2 className="q-text">{q.text}</h2>

        {q.type === "text" ? (
          <textarea
            className="q-textarea"
            placeholder={q.placeholder}
            value={answers[step]}
            onChange={e => handleSelect(e.target.value)}
          />
        ) : (
          <div className="q-options">
            {q.options.map((opt, i) => (
              <div key={i} className={`q-option ${answers[step] === opt ? "selected" : ""}`} onClick={() => handleSelect(opt)}>
                {opt}
              </div>
            ))}
          </div>
        )}

        <div className="q-nav">
          <button className="q-back" onClick={() => setStep(s => Math.max(0, s - 1))} style={{ visibility: step === 0 ? "hidden" : "visible" }}>
            ← Back
          </button>
          <button className="q-next" onClick={handleNext} disabled={!canNext}>
            {step === QUESTIONS.length - 1 ? "Generate My Path ✨" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ user, data, setPage, onBook }) {
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
            <button className="card-btn card-btn-primary" onClick={() => onBook(recommendedEvent)}>Book Now · {recommendedEvent.price}</button>
            <button className="card-btn card-btn-outline" onClick={() => setPage("events")}>See all events</button>
          </div>
        </div>

        {/* Community */}
        <div className="dash-card" style={{ background: `linear-gradient(135deg, rgba(124,158,142,0.08) 0%, rgba(196,160,154,0.08) 100%)` }}>
          <div className="dash-card-label">🤝 Community</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>💬</div>
          <div className="dash-card-title">Moving Forward Together</div>
          <div className="dash-card-desc">Connect with others who understand. Weekly virtual circles where you can share, listen, and heal side by side.</div>
          <button className="card-btn card-btn-outline">Join Community →</button>
        </div>

        {/* Book Session */}
        <div className="dash-card" style={{ background: `linear-gradient(135deg, rgba(196,160,154,0.1) 0%, rgba(158,112,112,0.06) 100%)` }}>
          <div className="dash-card-label">🌸 Private Support</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🧡</div>
          <div className="dash-card-title">Book a 1:1 Healing Session</div>
          <div className="dash-card-desc">60 minutes of personal, compassionate coaching with a certified specialist. Flexible scheduling, completely confidential.</div>
          <button className="card-btn card-btn-rose" onClick={() => onBook(EVENTS[5])}>Book Session · $95</button>
        </div>

        {/* Today's Step */}
        <div className="dash-card">
          <div className="dash-card-label">📌 Today's Action</div>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌱</div>
          <div className="dash-card-title">Your Next Step</div>
          <div className="dash-card-desc" style={{ fontStyle: "italic", color: THEME.sageDark }}>{data.nextStep}</div>
          <div style={{ marginTop: 16, padding: "12px 16px", background: THEME.sand, borderRadius: 12, fontSize: 13, color: THEME.textMid }}>
            Check back daily for new micro-steps tailored to where you are.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Events Page ──────────────────────────────────────────────────────────────
function EventsPage({ onBook, user, onLogin }) {
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
            <div className="event-card-img" style={{ background: ev.tag === "workshop" ? "rgba(124,158,142,0.1)" : ev.tag === "online" ? "rgba(196,160,154,0.1)" : "rgba(168,196,181,0.15)" }}>
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

// ─── Booking / Stripe Modal ───────────────────────────────────────────────────
function BookingModal({ event, onClose }) {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formatCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length > 2 ? d.slice(0,2) + "/" + d.slice(2) : d; };

  const handlePay = async () => {
    if (!card || !expiry || !cvc || !name) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false); setSuccess(true);
    // mock store
    mockDB.sessions[event.id] = { eventId: event.id, bookedAt: new Date().toISOString() };
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        {success ? (
          <div className="success-box">
            <div className="success-icon">🌿</div>
            <div className="success-title">You're confirmed!</div>
            <p className="success-desc">
              Your spot in <strong>{event.title}</strong> is reserved. A confirmation has been sent to your email. We're so glad you're here.
            </p>
            <button className="form-btn" onClick={onClose} style={{ marginTop: 28 }}>Back to Dashboard</button>
          </div>
        ) : (
          <>
            <div className="modal-title">Complete Booking</div>
            <p className="modal-sub">{event.title} · {event.price}</p>

            <div className="stripe-field">
              <label>Name on card</label>
              <input placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="stripe-field">
              <label>Card number</label>
              <input placeholder="4242 4242 4242 4242" value={card} onChange={e => setCard(formatCard(e.target.value))} />
            </div>
            <div className="stripe-row">
              <div className="stripe-field">
                <label>Expiry</label>
                <input placeholder="MM/YY" value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} />
              </div>
              <div className="stripe-field">
                <label>CVC</label>
                <input placeholder="•••" maxLength={4} value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} />
              </div>
            </div>

            <div className="stripe-secure">
              <span style={{ fontSize: 16 }}>🔒</span>
              <span>Secured by</span>
              <span className="stripe-badge">Stripe</span>
              <span style={{ marginLeft: "auto", color: THEME.sage, fontWeight: 500 }}>256-bit SSL</span>
            </div>

            <div className="modal-btns">
              <button className="modal-cancel" onClick={onClose}>Cancel</button>
              <button className="modal-pay" onClick={handlePay} disabled={loading || !card || !expiry || !cvc || !name}>
                {loading ? "Processing..." : `Pay ${event.price}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
