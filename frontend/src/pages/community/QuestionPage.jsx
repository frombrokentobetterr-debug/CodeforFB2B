import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../lib/supabase";
import AnswerBlurGate from "../../components/AnswerBlurGate";

const relTime = iso => {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d !== 1 ? "s" : ""} ago`;
  const mo = Math.floor(d / 30);
  return `${mo} month${mo !== 1 ? "s" : ""} ago`;
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

  .qp {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    background: #f4ede3;
    min-height: 100vh;
    color: #2a1e18;
    padding-bottom: 80px;
  }

  .qp-inner {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 32px;
  }

  .qp-back {
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
  .qp-back:hover { color: #c4623a; }

  .qp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 400;
    color: #1c1410;
    line-height: 1.25;
    margin: 0 0 18px;
  }

  .qp-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }

  .qp-tag-pill {
    display: inline-block;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #fef0e8;
    color: #c4623a;
    border: 1px solid #f0d4c0;
    padding: 4px 12px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .qp-meta-dot { color: #c9b99a; font-size: 11px; }
  .qp-meta-text { font-size: 11px; color: #a09080; }

  .qp-body {
    font-size: 14px;
    color: #4a3e38;
    line-height: 1.9;
    margin-bottom: 36px;
    white-space: pre-wrap;
  }

  .qp-divider {
    border: none;
    border-top: 1px solid #e0d4c4;
    margin: 0 0 32px;
  }

  .qp-answers-head {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 300;
    color: #1c1410;
    margin: 0 0 24px;
  }

  /* Reply cards */
  .qp-reply-card {
    background: white;
    border-radius: 8px;
    padding: 20px 22px;
    margin-bottom: 14px;
    border: 1px solid #f0e8de;
  }

  .qp-reply-body {
    font-size: 13px;
    color: #2a1e18;
    line-height: 1.85;
    margin: 0 0 12px;
    white-space: pre-wrap;
  }

  .qp-reply-meta {
    font-size: 11px;
    color: #a09080;
    display: flex;
    gap: 10px;
  }

  .qp-no-replies {
    font-size: 13px;
    color: #a09080;
    font-style: italic;
    padding: 8px 0 24px;
  }

  /* Reply form */
  .qp-form-wrap { margin-top: 40px; }

  .qp-form-head {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #8a7d74;
    margin-bottom: 12px;
  }

  .qp-textarea {
    width: 100%;
    background: white;
    border: 1px solid #e0d4c4;
    border-radius: 6px;
    padding: 14px 16px;
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
  .qp-textarea::placeholder { color: #b8a898; }
  .qp-textarea:focus { border-color: #c4623a; }

  .qp-anon-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 12px 0 18px;
    font-size: 12px;
    color: #6a5a50;
    cursor: pointer;
    user-select: none;
  }
  .qp-anon-row input { accent-color: #c4623a; cursor: pointer; width: 14px; height: 14px; }

  .qp-submit-btn {
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 13px 32px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .qp-submit-btn:hover { background: #9e4828; }
  .qp-submit-btn:disabled { background: #c4a898; cursor: not-allowed; }

  .qp-form-error {
    font-size: 12px;
    color: #c0392b;
    margin-top: 12px;
    line-height: 1.6;
  }

  /* States */
  .qp-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #a09080;
  }

  .qp-404 {
    text-align: center;
    padding: 100px 24px;
  }
  .qp-404-icon { font-size: 40px; margin-bottom: 16px; }
  .qp-404 h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    color: #1c1410;
    margin: 0 0 10px;
  }
  .qp-404 p { font-size: 13px; color: #8a7d74; line-height: 1.8; }

  @media (max-width: 600px) {
    .qp-inner { padding: 28px 20px; }
  }
`;

function ReplyCard({ reply }) {
  const author = reply.is_anonymous ? "Anonymous Healer" : (reply.author_name ?? "Anonymous Healer");
  return (
    <div className="qp-reply-card">
      <p className="qp-reply-body">{reply.body}</p>
      <div className="qp-reply-meta">
        <span>{author}</span>
        <span>·</span>
        <span>{relTime(reply.created_at)}</span>
      </div>
    </div>
  );
}

export default function QuestionPage() {
  const { slug }    = useParams();
  const navigate    = useNavigate();

  const [post, setPost]           = useState(null);
  const [replies, setReplies]     = useState([]);
  const [user, setUser]           = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);

  // Reply form state
  const [replyBody, setReplyBody]       = useState("");
  const [isAnonymous, setIsAnonymous]   = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError]     = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Auth check
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      if (!cancelled) { setUser(currentUser); setIsLoggedIn(!!session); }

      // Fetch post by slug
      const { data: postData, error: postErr } = await supabase
        .from("community_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (cancelled) return;

      if (postErr || !postData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(postData);

      // Increment view count (fire and forget)
      supabase
        .from("community_posts")
        .update({ view_count: (postData.view_count ?? 0) + 1 })
        .eq("id", postData.id);

      // Fetch replies only if logged in
      if (session) {
        const { data: replyData } = await supabase
          .from("community_replies")
          .select("*")
          .eq("post_id", postData.id)
          .eq("status", "published")
          .order("created_at", { ascending: true });

        if (!cancelled) setReplies(replyData ?? []);
      }

      if (!cancelled) setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [slug]);

  const handleReply = async e => {
    e.preventDefault();
    if (!replyBody.trim()) return;
    setReplyError("");
    setReplyLoading(true);

    const { data: newReply, error: err } = await supabase
      .from("community_replies")
      .insert({
        post_id:      post.id,
        user_id:      user.id,
        body:         replyBody.trim(),
        is_anonymous: isAnonymous,
        author_name:  isAnonymous ? null : (user.user_metadata?.full_name ?? null),
        status:       "published",
      })
      .select()
      .single();

    setReplyLoading(false);

    if (err) {
      setReplyError("We could not post your answer right now. Please try again.");
      return;
    }

    setReplies(prev => [...prev, newReply]);
    setReplyBody("");
    setIsAnonymous(false);
  };

  // ── Loading ──
  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="qp"><div className="qp-spinner">Loading…</div></div>
      </>
    );
  }

  // ── 404 ──
  if (notFound) {
    return (
      <>
        <style>{styles}</style>
        <div className="qp">
          <div className="qp-inner">
            <Link to="/community" className="qp-back">← Back to Community</Link>
            <div className="qp-404">
              <div className="qp-404-icon">🌿</div>
              <h2>Question not found.</h2>
              <p>This question may have been removed or the link may be incorrect.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const primaryTag    = post.tags?.[0] ?? null;
  const author        = post.is_anonymous ? "Anonymous Healer" : (post.author_name ?? "Anonymous Healer");
  const metaDesc      = post.body
    ? post.body.slice(0, 160).replace(/\n/g, " ")
    : `A community question about ${primaryTag ?? "separation and healing"} — From Broken To Better.`;

  return (
    <>
      <Helmet>
        <title>{post.title} | From Broken To Better Community</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`https://frombrokentobetter.com/community/${post.slug}`} />
        <meta property="og:type"         content="article" />
        <meta property="og:url"          content={`https://frombrokentobetter.com/community/${post.slug}`} />
        <meta property="og:title"        content={`${post.title} | From Broken To Better`} />
        <meta property="og:description"  content={metaDesc} />
        <meta property="og:image"        content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:site_name"    content="From Broken To Better" />
        <meta property="og:locale"       content="en_IN" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${post.title} | From Broken To Better`} />
        <meta name="twitter:description" content={metaDesc} />
        <meta name="twitter:image"       content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>

      <style>{styles}</style>

      <div className="qp">
        <div className="qp-inner">

          <Link to="/community" className="qp-back">← Back to Community</Link>

          {/* Question header */}
          <h1 className="qp-title">{post.title}</h1>

          <div className="qp-meta">
            {primaryTag && <span className="qp-tag-pill">{primaryTag}</span>}
            <span className="qp-meta-dot">·</span>
            <span className="qp-meta-text">{relTime(post.created_at)}</span>
            <span className="qp-meta-dot">·</span>
            <span className="qp-meta-text">{author}</span>
          </div>

          {post.body && (
            <p className="qp-body">{post.body}</p>
          )}

          <hr className="qp-divider" />

          {/* Answers section */}
          <h2 className="qp-answers-head">
            {replies.length} Answer{replies.length !== 1 ? "s" : ""}
          </h2>

          <AnswerBlurGate
            isLoggedIn={isLoggedIn}
            answerCount={replies.length}
            onSignup={() => navigate("/register")}
          >
            {replies.length === 0 ? (
              <p className="qp-no-replies">
                No answers yet. Be the first to share what helped you.
              </p>
            ) : (
              replies.map(r => <ReplyCard key={r.id} reply={r} />)
            )}
          </AnswerBlurGate>

          {/* Reply form — logged in only */}
          {isLoggedIn && (
            <div className="qp-form-wrap">
              <hr className="qp-divider" />
              <p className="qp-form-head">Share Your Answer</p>
              <form onSubmit={handleReply}>
                <textarea
                  className="qp-textarea"
                  value={replyBody}
                  onChange={e => setReplyBody(e.target.value)}
                  placeholder="Share your experience… What helped you? What do you wish someone had told you?"
                  required
                />
                <label className="qp-anon-row">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                  />
                  Post anonymously
                </label>
                {replyError && <p className="qp-form-error">{replyError}</p>}
                <button className="qp-submit-btn" disabled={replyLoading}>
                  {replyLoading ? "Posting…" : "Share Your Answer →"}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
