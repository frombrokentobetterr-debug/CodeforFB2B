import { useState } from "react";
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
    justify-content: center;
  }

  .gf-group { margin-bottom: 20px; }
  .gf-group > label {
    display: block;
    font-size: 9px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #8a7d74;
    margin-bottom: 6px;
  }
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
  .gf-group input[type="number"]:focus,
  .gf-group textarea:focus,
  .gf-group select:focus { border-color: #c4623a; }
  .gf-group textarea { resize: vertical; min-height: 140px; line-height: 1.7; }
  .gf-group input::placeholder,
  .gf-group textarea::placeholder { color: #b8a898; }
  .gf-hint { font-size: 10px; color: #a09488; margin-top: 5px; }

  /* Checkboxes */
  .gf-checks { display: flex; gap: 20px; flex-wrap: wrap; }
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
  }
`;

const TRAITS = [
  { n: "01", title: "You've lived through it", text: "You have personal experience of separation or divorce and have moved through the hardest part. You don't need to be fully healed — just further along than those you'll support." },
  { n: "02", title: "You hold space, not solutions", text: "Your role is to listen, share your story, and walk alongside. You are not a therapist and you don't need to fix anything." },
  { n: "03", title: "You set your own pace", text: "Choose when you're available and how many sessions you take per week. No minimums, no quotas." },
  { n: "04", title: "You earn from your story", text: "Set your own session rate in INR. From Broken To Better takes nothing from your earnings." },
];

const SEPARATION_TYPES = [
  { value: "married",       label: "Married" },
  { value: "live_in",       label: "Live-in relationship" },
  { value: "long_term",     label: "Long-term partner" },
  { value: "situationship", label: "Situationship / Unclear" },
];

const LANGUAGES = [
  "Hindi", "English", "Tamil",
  "Bengali", "Marathi", "Punjabi", "Telugu", "Other"
];

export default function BecomeAGuide() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    bio: "",
    separation_type: "",
    languages_spoken: [],
    is_available: true,
    session_rate_inr: "",
    photo: null,
  });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleLanguage = lang =>
    setForm(prev => ({
      ...prev,
      languages_spoken: prev.languages_spoken.includes(lang)
        ? prev.languages_spoken.filter(l => l !== lang)
        : [...prev.languages_spoken, lang],
    }));

  const onSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Auth check
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setError("Please sign in first to apply as a guide.");
      setLoading(false);
      return;
    }

    // 2. Validate bio length
    if (form.bio.trim().length < 100) {
      setError("Please tell us a little more — your story helps seekers trust you.");
      setLoading(false);
      return;
    }

    // 3. Validate languages
    if (form.languages_spoken.length === 0) {
      setError("Please select at least one language you can support people in.");
      setLoading(false);
      return;
    }

    // 4. Upload photo if provided
    let photo_url = null;
    if (form.photo) {
      const ext      = form.photo.name.split(".").pop();
      const fileName = `${session.user.id}-${Date.now()}.${ext}`;
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
      photo_url = urlData.publicUrl;
    }

    // 5. Insert into Supabase
    const { error: err } = await supabase
      .from("peer_guide_profiles")
      .insert({
        user_id:                     session.user.id,
        bio:                         form.bio.trim(),
        separation_type_experienced: form.separation_type || null,
        languages_spoken:            form.languages_spoken.length
                                       ? form.languages_spoken
                                       : null,
        is_available:                form.is_available,
        session_rate_inr:            form.session_rate_inr
                                       ? parseInt(form.session_rate_inr, 10)
                                       : null,
        photo_url,
        is_approved_by_admin:        true,
      });

    setLoading(false);

    if (err) {
      setError(
        "Something went wrong. Please try again or email us at admin@frombrokentobetter.com"
      );
    } else {
      setSent(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Become a Peer Guide | From Broken To Better</title>
        <meta name="description" content="Share your story of surviving separation and help others do the same. Apply to become a peer guide at From Broken To Better." />
        <link rel="canonical" href="https://frombrokentobetter.com/become-a-guide" />
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content="https://frombrokentobetter.com/become-a-guide" />
        <meta property="og:title"        content="Become a Peer Guide | From Broken To Better" />
        <meta property="og:description"  content="Share your story of surviving separation and help others do the same. Apply to become a peer guide." />
        <meta property="og:image"        content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width"  content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name"    content="From Broken To Better" />
        <meta property="og:locale"       content="en_IN" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:url"         content="https://frombrokentobetter.com/become-a-guide" />
        <meta name="twitter:title"       content="Become a Peer Guide | From Broken To Better" />
        <meta name="twitter:description" content="Share your story of surviving separation and help others do the same." />
        <meta name="twitter:image"       content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>

      <style>{styles}</style>

      <div className="guide">
        <div className="guide-split">

          {/* LEFT */}
          <div className="guide-left">
            <div className="gl-label">Become a Guide</div>
            <h2>Your story<br />could save someone.</h2>
            <p className="gl-sub">You don't need a certification — you need to have survived.</p>

            <div className="guide-traits">
              {TRAITS.map(t => (
                <div className="guide-trait" key={t.n}>
                  <span className="gt-num">{t.n}</span>
                  <span className="gt-text">
                    <strong style={{ display: "block", color: "#e8d8cc", fontWeight: 400, marginBottom: 4 }}>
                      {t.title}
                    </strong>
                    {t.text}
                  </span>
                </div>
              ))}
            </div>

            <p className="gl-footer">
              Every application is reviewed by our team. We'll be in touch within 72 hours.
            </p>
          </div>

          {/* RIGHT */}
          <div className="guide-right">
            {sent ? (
              <div className="guide-success">
                <div style={{ fontSize: 40 }}>🌿</div>
                <h3>Application received.</h3>
                <p>
                  Thank you for wanting to help.<br />
                  Our team will review your application and reach out within 72 hours.
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

                <div className="gf-group">
                  <label>Your Story</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={onChange}
                    placeholder="Tell us what you went through and what helped you come out the other side."
                    required
                  />
                  <div className="gf-hint">This becomes your guide profile. Write honestly.</div>
                </div>

                <div className="gf-group">
                  <label>Type of Separation</label>
                  <select name="separation_type" value={form.separation_type} onChange={onChange}>
                    <option value="">Select one</option>
                    {SEPARATION_TYPES.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div className="gf-group">
                  <label>Languages You Can Support In</label>
                  <div className="gf-checks">
                    {LANGUAGES.map(lang => (
                      <label className="gf-check" key={lang}>
                        <input
                          type="checkbox"
                          checked={form.languages_spoken.includes(lang)}
                          onChange={() => toggleLanguage(lang)}
                        />
                        {lang}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="gf-group">
                  <label>Availability</label>
                  <div className="gf-toggle-row">
                    <span className="gf-toggle-label">
                      {form.is_available
                        ? "Available to take sessions"
                        : "Not available right now"}
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
                  <div className="gf-hint">You can change this anytime from your profile.</div>
                </div>

                <div className="gf-group">
                  <label>
                    Session Rate{" "}
                    <span style={{ fontWeight: 300, textTransform: "none", fontSize: 9, color: "#b8a898" }}>
                      (₹ per session, optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="session_rate_inr"
                    value={form.session_rate_inr}
                    onChange={onChange}
                    placeholder="e.g. 500"
                    min="0"
                  />
                  <div className="gf-hint">Leave blank to offer sessions for free or decide later.</div>
                </div>

                <div className="gf-group">
                  <label>
                    Profile Photo{" "}
                    <span style={{ fontWeight: 300, textTransform: "none", fontSize: 9, color: "#b8a898" }}>
                      (optional)
                    </span>
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
                  <div className="gf-hint">JPG or PNG. Shown on your guide card.</div>
                </div>

                {error && <p className="guide-error">{error}</p>}

                <button className="guide-btn" disabled={loading}>
                  {loading ? "Submitting…" : "Apply to Be a Guide →"}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </>
  );
}