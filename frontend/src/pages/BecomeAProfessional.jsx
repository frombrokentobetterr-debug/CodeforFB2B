import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../lib/supabase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .guide { font-family: 'Jost', sans-serif; font-weight: 300; background: #f4ede3; color: #2a2420; }

  .guide-split {
    display: flex;
    align-items: stretch;
    min-height: 100vh;
    width: 100%;
  }

  /* LEFT — dark walnut */
  .guide-left {
    flex: 0 0 50%;
    background: #1c1410;
    padding: 64px;
    display: flex;
    flex-direction: column;
    color: #f4ede3;
  }
  .guide-left .gl-label {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #a05a3a;
    margin-bottom: 24px;
  }
  .guide-left h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3.5vw, 48px);
    font-weight: 300;
    line-height: 1.2;
    color: #f4ede3;
    margin-bottom: 16px;
  }
  .guide-left .gl-sub {
    font-size: 13px;
    color: #a09080;
    line-height: 1.8;
    margin-bottom: 48px;
  }

  .guide-traits { flex: 1; display: flex; flex-direction: column; justify-content: flex-start; }
  .guide-trait {
    padding: 20px 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
  .guide-trait:last-child { border-bottom: 1px solid rgba(255,255,255,0.08); }
  .gt-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    color: #a05a3a;
    letter-spacing: 0.05em;
    flex-shrink: 0;
    padding-top: 1px;
  }
  .gt-text {
    font-size: 13px;
    color: #c8b8ac;
    line-height: 1.75;
  }

  .guide-left .gl-footer {
    margin-top: 48px;
    font-size: 10px;
    color: #5a4a40;
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  /* RIGHT — cream form */
  .guide-right {
    flex: 0 0 50%;
    background: #f4ede3;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  /* Section headers inside form */
  .gf-section-head {
    font-size: 9px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #a05a3a;
    margin: 28px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e0d4c4;
  }
  .gf-section-head:first-child { margin-top: 0; }

  .gf-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .gf-group { margin-bottom: 16px; }
  .gf-group > label {
    display: block;
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #8a7d74;
    margin-bottom: 6px;
  }
  .gf-group input[type="text"],
  .gf-group input[type="email"],
  .gf-group input[type="number"],
  .gf-group textarea,
  .gf-group select {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e0d4c4;
    border-radius: 4px;
    padding: 12px 14px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2a2420;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
    appearance: none;
  }
  .gf-group input[type="text"]:focus,
  .gf-group input[type="email"]:focus,
  .gf-group input[type="number"]:focus,
  .gf-group textarea:focus,
  .gf-group select:focus { border-color: #c4623a; }
  .gf-group input:disabled { background: #f8f3ee; color: #a09080; cursor: not-allowed; }
  .gf-group textarea { resize: vertical; min-height: 130px; line-height: 1.7; }
  .gf-group input::placeholder,
  .gf-group textarea::placeholder { color: #b8a898; }
  .gf-hint { font-size: 10px; color: #a09488; margin-top: 5px; }

  /* Checkboxes */
  .gf-checks { display: flex; gap: 12px; flex-wrap: wrap; }
  .gf-check {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 13px;
    color: #2a2420;
    user-select: none;
  }
  .gf-check input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #c4623a;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Toggle */
  .gf-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border: 1px solid #e0d4c4;
    border-radius: 4px;
    padding: 12px 14px;
  }
  .gf-toggle-label { font-size: 13px; color: #2a2420; }
  .gf-toggle {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
  }
  .gf-toggle input { opacity: 0; width: 0; height: 0; }
  .gf-toggle-slider {
    position: absolute;
    inset: 0;
    background: #e0d4c4;
    border-radius: 22px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .gf-toggle-slider::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    left: 3px;
    top: 3px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .gf-toggle input:checked + .gf-toggle-slider { background: #c4623a; }
  .gf-toggle input:checked + .gf-toggle-slider::before { transform: translateX(18px); }

  /* File upload */
  .gf-file-label {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff;
    border: 1px dashed #c4a898;
    border-radius: 4px;
    padding: 14px 16px;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .gf-file-label:hover { border-color: #c4623a; }
  .gf-file-label input[type="file"] { display: none; }
  .gf-file-text { font-size: 12px; color: #8a7d74; }

  .guide-btn {
    width: 100%;
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 15px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
  }
  .guide-btn:hover { background: #9e4828; }
  .guide-btn:disabled { background: #c4a898; cursor: not-allowed; }

  .guide-error { font-size: 12px; color: #c0392b; margin-top: 12px; line-height: 1.6; }

  .guide-success { text-align: center; padding: 48px 0; }
  .guide-success h3 { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #2a2420; margin: 14px 0 10px; }
  .guide-success p { font-size: 13px; color: #8a7d74; line-height: 1.8; }
  .guide-success .guide-btn { max-width: 280px; margin: 28px auto 0; display: block; }

  @media (max-width: 768px) {
    .guide-split { flex-direction: column; }
    .guide-left  { flex: none; padding: 48px 28px; }
    .guide-right { flex: none; padding: 48px 28px; }
    .gf-row      { grid-template-columns: 1fr; }
  }
`;

const STEPS = [
  {
    n: "01",
    title: "Share your professional background",
    text: "Tell us about your credentials and areas of support.",
  },
  {
    n: "02",
    title: "Create your professional profile",
    text: "Add languages, session formats, and your availability.",
  },
  {
    n: "03",
    title: "Begin supporting seekers",
    text: "Offer structured guidance to people navigating separation and life transitions.",
  },
];

const SESSION_FORMATS = ["Video", "Audio", "Chat"];

const LANGUAGES = [
  "Hindi", "English", "Tamil",
  "Bengali", "Marathi", "Punjabi", "Telugu", "Other",
];

export default function BecomeAProfessional() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    specialisation: "",
    credentials: "",
    years_experience: "",
    professional_bio: "",
    session_formats: [],
    languages_spoken: [],
    session_rate_inr: "",
    city_state: "",
    is_available: true,
    photo: null,
  });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // Pre-fill email and name from auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setForm(prev => ({
          ...prev,
          email:     session.user.email ?? "",
          full_name: session.user.user_metadata?.full_name ?? "",
        }));
      }
    });
  }, []);

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleList = (key, value) =>
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value],
    }));

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("Please sign in first to submit your application.");
      setLoading(false);
      return;
    }

    if (!form.specialisation.trim()) {
      setError("Please enter your professional title.");
      setLoading(false);
      return;
    }
    if (!form.professional_bio.trim()) {
      setError("Please add a short professional bio.");
      setLoading(false);
      return;
    }

    // Upload photo if provided
    let profile_photo_url = null;
    if (form.photo) {
      const ext      = form.photo.name.split(".").pop();
      const fileName = `practitioner-${session.user.id}-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("guide-photos")
        .upload(fileName, form.photo, { upsert: false });

      if (uploadErr) {
        setError("Photo upload failed. Please try again or skip the photo.");
        setLoading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("guide-photos")
        .getPublicUrl(fileName);
      profile_photo_url = urlData.publicUrl;
    }

    // Upsert — avoids duplicate rows for the same user
    const { error: err } = await supabase
      .from("practitioner_profiles")
      .upsert(
        {
          user_id:              session.user.id,
          specialisation:       form.specialisation.trim(),
          credentials:          form.credentials.trim() || null,
          years_experience:     form.years_experience || null,
          professional_bio:     form.professional_bio.trim(),
          session_formats:      form.session_formats.length ? form.session_formats : null,
          languages_spoken:     form.languages_spoken.length ? form.languages_spoken : null,
          session_rate_inr:     form.session_rate_inr ? parseInt(form.session_rate_inr, 10) : null,
          city_state:           form.city_state.trim() || null,
          is_available:         form.is_available,
          is_verified_by_admin: false,
          ...(profile_photo_url && { profile_photo_url }),
        },
        { onConflict: "user_id" }
      );

    setLoading(false);

    if (err) {
      setError("Something went wrong. Please try again or email us at admin@frombrokentobetter.com");
    } else {
      setSent(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Apply as a Professional | From Broken To Better</title>
        <meta name="description" content="Therapists, counselors, and trained professionals — join From Broken to Better and support people rebuilding their lives after separation." />
        <link rel="canonical" href="https://frombrokentobetter.com/apply-as-professional" />
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content="https://frombrokentobetter.com/apply-as-professional" />
        <meta property="og:title"        content="Apply as a Professional | From Broken To Better" />
        <meta property="og:description"  content="Therapists, counselors, and trained professionals — join From Broken to Better and support people rebuilding their lives after separation." />
        <meta property="og:image"        content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name"    content="From Broken To Better" />
        <meta property="og:locale"       content="en_IN" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:url"         content="https://frombrokentobetter.com/apply-as-professional" />
        <meta name="twitter:title"       content="Apply as a Professional | From Broken To Better" />
        <meta name="twitter:description" content="Therapists, counselors, and trained professionals — join From Broken to Better." />
        <meta name="twitter:image"       content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>

      <style>{styles}</style>

      <div className="guide">
        <div className="guide-split">

          {/* LEFT */}
          <div className="guide-left">
            <div className="gl-label">For Professionals</div>
            <h2>Guide toward their<br />next chapter.</h2>
            <p className="gl-sub">
              Many people navigating separation benefit from speaking with trained professionals.<br /><br />
              From Broken To Better invites therapists, counselors, and practitioners who support people through major life transitions.<br /><br />
              Your role is not to fix people, but to help them reflect, rebuild, and move forward.
            </p>

            <div className="guide-traits">
              {STEPS.map(s => (
                <div className="guide-trait" key={s.n}>
                  <span className="gt-num">{s.n}</span>
                  <span className="gt-text">
                    <strong style={{ display: "block", color: "#e8d8cc", fontWeight: 400, marginBottom: 4 }}>
                      {s.title}
                    </strong>
                    {s.text}
                  </span>
                </div>
              ))}
            </div>

            <p className="gl-footer">
              Applications are reviewed by our team. We typically respond within 72 hours.
            </p>
          </div>

          {/* RIGHT */}
          <div className="guide-right">
            {sent ? (
              <div className="guide-success">
                <div style={{ fontSize: 40 }}>🌿</div>
                <h3>Application received.</h3>
                <p>
                  Thank you for applying.<br />
                  Our team will review your profile and reach out within 72 hours.
                </p>
                <button
                  className="guide-btn"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to your Dashboard →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit}>

                {/* Basics */}
                <div className="gf-section-head">Your Details</div>

                <div className="gf-row">
                  <div className="gf-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={form.full_name}
                      onChange={onChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="gf-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      disabled
                    />
                    <div className="gf-hint">From your account.</div>
                  </div>
                </div>

                <div className="gf-row">
                  <div className="gf-group">
                    <label>Professional Title</label>
                    <input
                      type="text"
                      name="specialisation"
                      value={form.specialisation}
                      onChange={onChange}
                      placeholder="e.g. Therapist, Counselor, Coach"
                      required
                    />
                  </div>
                  <div className="gf-group">
                    <label>
                      Credentials{" "}
                      <span style={{ fontWeight: 300, textTransform: "none", fontSize: 9, color: "#b8a898" }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="credentials"
                      value={form.credentials}
                      onChange={onChange}
                      placeholder="e.g. MA Psychology, LMFT"
                    />
                  </div>
                </div>

                <div className="gf-row">
                  <div className="gf-group">
                    <label>Years of Experience</label>
                    <select name="years_experience" value={form.years_experience} onChange={onChange}>
                      <option value="">Select</option>
                      <option value="0–3 years">0–3 years</option>
                      <option value="3–6 years">3–6 years</option>
                      <option value="6–9 years">6–9 years</option>
                      <option value="9+ years">9+ years</option>
                    </select>
                  </div>
                  <div className="gf-group">
                    <label>City / Location</label>
                    <input
                      type="text"
                      name="city_state"
                      value={form.city_state}
                      onChange={onChange}
                      placeholder="e.g. Mumbai, Delhi"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="gf-section-head">Your Approach</div>

                <div className="gf-group">
                  <label>Professional Bio</label>
                  <textarea
                    name="professional_bio"
                    value={form.professional_bio}
                    onChange={onChange}
                    placeholder="Briefly describe your background and the kind of guidance you offer to people navigating life transitions."
                    required
                  />
                </div>

                {/* Session details */}
                <div className="gf-section-head">Session Details</div>

                <div className="gf-group">
                  <label>Session Format</label>
                  <div className="gf-checks">
                    {SESSION_FORMATS.map(fmt => (
                      <label className="gf-check" key={fmt}>
                        <input
                          type="checkbox"
                          checked={form.session_formats.includes(fmt)}
                          onChange={() => toggleList("session_formats", fmt)}
                        />
                        {fmt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="gf-group">
                  <label>Languages You Can Support In</label>
                  <div className="gf-checks">
                    {LANGUAGES.map(lang => (
                      <label className="gf-check" key={lang}>
                        <input
                          type="checkbox"
                          checked={form.languages_spoken.includes(lang)}
                          onChange={() => toggleList("languages_spoken", lang)}
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="gf-row">
                  <div className="gf-group">
                    <label>
                      Session Rate{" "}
                      <span style={{ fontWeight: 300, textTransform: "none", fontSize: 9, color: "#b8a898" }}>(₹ per session)</span>
                    </label>
                    <input
                      type="number"
                      name="session_rate_inr"
                      value={form.session_rate_inr}
                      onChange={onChange}
                      placeholder="e.g. 1500"
                      min="0"
                    />
                  </div>
                  <div className="gf-group">
                    <label>Availability</label>
                    <div className="gf-toggle-row">
                      <span className="gf-toggle-label">
                        {form.is_available ? "Available" : "Not available"}
                      </span>
                      <label className="gf-toggle">
                        <input
                          type="checkbox"
                          checked={form.is_available}
                          onChange={e =>
                            setForm(prev => ({ ...prev, is_available: e.target.checked }))
                          }
                        />
                        <span className="gf-toggle-slider" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <div className="gf-section-head">Profile Photo</div>

                <div className="gf-group">
                  <label>
                    Photo{" "}
                    <span style={{ fontWeight: 300, textTransform: "none", fontSize: 9, color: "#b8a898" }}>(optional)</span>
                  </label>
                  <label className="gf-file-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e =>
                        setForm(prev => ({ ...prev, photo: e.target.files[0] ?? null }))
                      }
                    />
                    <span style={{ fontSize: 20, color: "#c4a898", lineHeight: 1 }}>↑</span>
                    <span className="gf-file-text">
                      {form.photo ? form.photo.name : "Click to upload a photo"}
                    </span>
                  </label>
                  <div className="gf-hint">JPG or PNG. Shown on your profile.</div>
                </div>

                {error && <p className="guide-error">{error}</p>}

                <button className="guide-btn" disabled={loading}>
                  {loading ? "Submitting…" : "Apply as a Professional →"}
                </button>

                <div className="gf-hint" style={{ textAlign: "center", marginTop: 12 }}>
                  Applications are reviewed by our team. We typically respond within 72 hours.
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
