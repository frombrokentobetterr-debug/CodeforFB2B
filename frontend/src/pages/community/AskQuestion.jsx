import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../lib/supabase";

const ALL_TAGS = [
  "Divorce & Separation",
  "Co-Parenting",
  "Financial Recovery",
  "Identity & Self Worth",
  "Dating Again",
  "Grief & Loneliness",
  "Legal Questions",
  "Mental Health",
  "Practical Life",
];

const slugify = title => {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}-${suffix}`;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .aq {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    background: #f4ede3;
    min-height: 100vh;
    color: #2a1e18;
    padding-bottom: 100px;
  }

  .aq-inner {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .aq-back {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #8a7d74;
    text-decoration: none;
    margin-bottom: 36px;
    transition: color 0.2s;
  }
  .aq-back:hover { color: #c4623a; }

  .aq-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    font-weight: 400;
    color: #1c1410;
    line-height: 1.2;
    margin: 0 0 10px;
  }

  .aq-subtitle {
    font-size: 13px;
    color: #8a7d74;
    line-height: 1.75;
    margin: 0 0 40px;
  }

  .aq-field {
    margin-bottom: 28px;
  }

  .aq-label {
    display: block;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #6a5a50;
    margin-bottom: 10px;
  }

  .aq-label-optional {
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: none;
    color: #a09080;
    margin-left: 6px;
  }

  .aq-input {
    width: 100%;
    background: white;
    border: 1px solid #e0d4c4;
    border-radius: 6px;
    padding: 13px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2a1e18;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .aq-input::placeholder { color: #b8a898; }
  .aq-input:focus { border-color: #c4623a; }

  .aq-input-row {
    position: relative;
  }

  .aq-char-count {
    position: absolute;
    right: 12px;
    bottom: 10px;
    font-size: 10px;
    color: #b8a898;
    pointer-events: none;
  }
  .aq-char-count.near { color: #c4623a; }

  .aq-textarea {
    width: 100%;
    background: white;
    border: 1px solid #e0d4c4;
    border-radius: 6px;
    padding: 13px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2a1e18;
    outline: none;
    resize: vertical;
    min-height: 120px;
    line-height: 1.75;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .aq-textarea::placeholder { color: #b8a898; }
  .aq-textarea:focus { border-color: #c4623a; }

  .aq-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .aq-tag-pill {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid #d8c9b8;
    background: white;
    color: #6a5a50;
    padding: 7px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    user-select: none;
  }

  .aq-tag-pill.selected {
    background: #c4623a;
    color: white;
    border-color: #c4623a;
  }

  .aq-tag-pill:hover:not(.selected) {
    border-color: #c4623a;
    color: #c4623a;
  }

  .aq-tag-hint {
    font-size: 11px;
    color: #a09080;
    margin-top: 10px;
  }

  .aq-anon-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #6a5a50;
    cursor: pointer;
    user-select: none;
  }
  .aq-anon-row input {
    accent-color: #c4623a;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }

  .aq-divider {
    border: none;
    border-top: 1px solid #e0d4c4;
    margin: 32px 0;
  }

  .aq-submit-btn {
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 14px 36px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .aq-submit-btn:hover { background: #9e4828; }
  .aq-submit-btn:disabled { background: #c4a898; cursor: not-allowed; }

  .aq-error {
    font-size: 12px;
    color: #c0392b;
    margin-top: 14px;
    line-height: 1.6;
  }

  .aq-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #a09080;
  }

  @media (max-width: 600px) {
    .aq-inner { padding: 28px 20px; }
    .aq-title { font-size: 26px; }
  }
`;

export default function AskQuestion() {
  const navigate = useNavigate();

  const [user, setUser]         = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [title, setTitle]           = useState("");
  const [body, setBody]             = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAnonymous, setIsAnonymous]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [error, setError]               = useState("");

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/register");
        return;
      }
      setUser(session.user);
      setAuthLoading(false);
    })();
  }, [navigate]);

  const toggleTag = tag => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      if (prev.length >= 2) return prev;
      return [...prev, tag];
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) return;
    if (selectedTags.length === 0) {
      setError("Please choose at least one category.");
      return;
    }
    setError("");
    setSubmitting(true);

    const slug = slugify(title.trim());

    const { data: newPost, error: insertErr } = await supabase
      .from("community_posts")
      .insert({
        user_id:      user.id,
        title:        title.trim(),
        body:         body.trim() || null,
        tags:         selectedTags,
        slug,
        is_anonymous: isAnonymous,
        author_name:  isAnonymous ? null : (user.user_metadata?.full_name ?? null),
      })
      .select()
      .single();

    setSubmitting(false);

    if (insertErr) {
      setError("We could not post your question right now. Please try again.");
      return;
    }

    navigate(`/community/${newPost.slug}`);
  };

  if (authLoading) {
    return (
      <>
        <style>{styles}</style>
        <div className="aq"><div className="aq-spinner">Loading…</div></div>
      </>
    );
  }

  const titleLen = title.length;
  const nearLimit = titleLen >= 160;

  return (
    <>
      <Helmet>
        <title>Ask the Community | From Broken To Better</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <style>{styles}</style>

      <div className="aq">
        <div className="aq-inner">

          <Link to="/community" className="aq-back">← Back to Community</Link>

          <h1 className="aq-title">Ask the Community</h1>
          <p className="aq-subtitle">
            Your question might be exactly what someone else needed to hear.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="aq-field">
              <label className="aq-label">What's your question?</label>
              <div className="aq-input-row">
                <input
                  className="aq-input"
                  style={{ paddingRight: 52 }}
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value.slice(0, 200))}
                  placeholder="e.g. How do I talk to my kids about the separation?"
                  required
                />
                <span className={`aq-char-count${nearLimit ? " near" : ""}`}>
                  {titleLen}/200
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="aq-field">
              <label className="aq-label">
                Share more if you'd like
                <span className="aq-label-optional">(optional)</span>
              </label>
              <textarea
                className="aq-textarea"
                rows={5}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Add any background that might help people answer..."
              />
            </div>

            {/* Tags */}
            <div className="aq-field">
              <label className="aq-label">Choose a category (up to 2)</label>
              <div className="aq-tags">
                {ALL_TAGS.map(tag => (
                  <span
                    key={tag}
                    className={`aq-tag-pill${selectedTags.includes(tag) ? " selected" : ""}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {selectedTags.length === 2 && (
                <p className="aq-tag-hint">Maximum 2 categories selected.</p>
              )}
            </div>

            {/* Anonymous */}
            <div className="aq-field">
              <label className="aq-anon-row">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                />
                Post anonymously — your name will show as "Anonymous Healer"
              </label>
            </div>

            <hr className="aq-divider" />

            {error && <p className="aq-error">{error}</p>}

            <button className="aq-submit-btn" disabled={submitting}>
              {submitting ? "Posting…" : "Post Your Question →"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
