import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../../lib/supabase";

const PAGE_SIZE = 20;

const ALL_TAGS = [
  "Divorce & Separation", "Co-Parenting", "Financial Recovery",
  "Identity & Self Worth", "Dating Again", "Grief & Loneliness",
  "Legal Questions", "Mental Health", "Practical Life",
];

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

  .comm {
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    background: #f4ede3;
    min-height: 100vh;
    color: #2a1e18;
    padding-bottom: 100px;
  }

  /* ── Hero ── */
  .comm-hero {
    background: #1c1410;
    padding: 80px 48px 64px;
    text-align: center;
  }
  .comm-hero-eyebrow {
    font-size: 9px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: #a05a3a;
    margin-bottom: 16px;
  }
  .comm-hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 72px);
    font-weight: 300;
    color: #f4ede3;
    line-height: 1;
    margin-bottom: 18px;
    letter-spacing: -0.01em;
  }
  .comm-hero-sub {
    font-size: 13px;
    color: #a09080;
    max-width: 440px;
    margin: 0 auto;
    line-height: 1.8;
  }

  /* ── Controls ── */
  .comm-controls {
    max-width: 1120px;
    margin: 0 auto;
    padding: 32px 32px 0;
  }

  .comm-search-wrap {
    position: relative;
    margin-bottom: 20px;
  }
  .comm-search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #b8a898;
    font-size: 14px;
    pointer-events: none;
  }
  .comm-search {
    width: 100%;
    background: white;
    border: 1px solid #e0d4c4;
    border-radius: 6px;
    padding: 12px 14px 12px 38px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2a1e18;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .comm-search::placeholder { color: #b8a898; }
  .comm-search:focus { border-color: #c4623a; }

  .comm-tags-wrap {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 4px;
  }
  .comm-tags-wrap::-webkit-scrollbar { display: none; }

  .comm-tags {
    display: flex;
    gap: 8px;
    white-space: nowrap;
  }

  .comm-tag {
    display: inline-block;
    padding: 6px 16px;
    border-radius: 40px;
    border: 1px solid #e0d4c4;
    background: white;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.05em;
    color: #6a5a50;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
    white-space: nowrap;
  }
  .comm-tag:hover { border-color: #c4623a; color: #c4623a; }
  .comm-tag-active {
    background: #c4623a;
    border-color: #c4623a;
    color: white;
  }
  .comm-tag-active:hover { background: #9e4828; border-color: #9e4828; color: white; }

  /* ── Grid ── */
  .comm-grid-wrap {
    max-width: 1120px;
    margin: 28px auto 0;
    padding: 0 32px;
  }

  .comm-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* ── Card ── */
  .comm-card {
    background: white;
    border-radius: 8px;
    padding: 24px;
    border: 1px solid #f0e8de;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .comm-card:hover {
    box-shadow: 0 4px 24px rgba(42,30,24,0.10);
    transform: translateY(-2px);
  }

  .comm-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 10px;
  }

  .comm-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    font-weight: 400;
    color: #1c1410;
    line-height: 1.35;
    margin: 0;
    flex: 1;
  }

  .comm-card-tag {
    display: inline-block;
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: #fef0e8;
    color: #c4623a;
    border: 1px solid #f0d4c0;
    padding: 3px 10px;
    border-radius: 20px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .comm-card-answers {
    font-size: 11px;
    color: #8a7d74;
    margin-bottom: 10px;
    letter-spacing: 0.03em;
  }

  .comm-card-lock {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #b8a898;
    margin-bottom: 10px;
  }

  .comm-card-meta {
    font-size: 11px;
    color: #a09080;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* ── Skeleton ── */
  .comm-skeleton {
    background: white;
    border-radius: 8px;
    padding: 24px;
    border: 1px solid #f0e8de;
  }
  .comm-skel-line {
    height: 12px;
    background: linear-gradient(90deg, #f0e8de 25%, #f9f4ee 50%, #f0e8de 75%);
    background-size: 200% 100%;
    border-radius: 4px;
    animation: comm-shimmer 1.4s infinite;
    margin-bottom: 10px;
  }
  @keyframes comm-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ── States ── */
  .comm-state {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 24px;
    color: #8a7d74;
    font-size: 13px;
    line-height: 1.8;
  }
  .comm-state-icon { font-size: 36px; margin-bottom: 12px; }
  .comm-state h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 24px;
    font-weight: 300;
    color: #2a1e18;
    margin: 0 0 8px;
  }

  /* ── Load More ── */
  .comm-loadmore-wrap {
    text-align: center;
    margin-top: 36px;
  }
  .comm-loadmore {
    background: transparent;
    border: 1px solid #c4a898;
    border-radius: 40px;
    padding: 12px 36px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #6a5a50;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
  }
  .comm-loadmore:hover { border-color: #c4623a; color: #c4623a; }
  .comm-loadmore:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── FAB ── */
  .comm-fab {
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: #c4623a;
    color: white;
    border: none;
    border-radius: 40px;
    padding: 14px 26px;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 300;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(196, 98, 58, 0.35);
    transition: background 0.2s, box-shadow 0.2s;
    z-index: 50;
  }
  .comm-fab:hover {
    background: #9e4828;
    box-shadow: 0 6px 28px rgba(196, 98, 58, 0.45);
  }

  @media (max-width: 768px) {
    .comm-hero { padding: 64px 24px 48px; }
    .comm-controls { padding: 24px 20px 0; }
    .comm-grid-wrap { padding: 0 20px; }
    .comm-grid { grid-template-columns: 1fr; }
    .comm-fab { bottom: 20px; right: 20px; padding: 12px 20px; }
  }
`;

function SkeletonCard() {
  return (
    <div className="comm-skeleton">
      <div className="comm-skel-line" style={{ width: "60%", height: 10, marginBottom: 12 }} />
      <div className="comm-skel-line" style={{ width: "90%", height: 16, marginBottom: 8 }} />
      <div className="comm-skel-line" style={{ width: "75%", height: 16, marginBottom: 16 }} />
      <div className="comm-skel-line" style={{ width: "40%", height: 10 }} />
    </div>
  );
}

function QuestionCard({ post, isLoggedIn, onClick }) {
  const primaryTag = post.tags?.[0] ?? null;
  const author = post.is_anonymous ? "Anonymous Healer" : (post.users?.full_name ?? "Anonymous Healer");

  return (
    <div className="comm-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onClick()}>
      <div className="comm-card-top">
        <h3 className="comm-card-title">{post.title}</h3>
        {primaryTag && <span className="comm-card-tag">{primaryTag}</span>}
      </div>

      {isLoggedIn ? (
        <div className="comm-card-answers">
          {post.answer_count ?? 0} answer{(post.answer_count ?? 0) !== 1 ? "s" : ""}
        </div>
      ) : (
        <div className="comm-card-lock">
          <span>🔒</span>
          <span>Sign in to read answers</span>
        </div>
      )}

      <div className="comm-card-meta">
        <span>{relTime(post.created_at)}</span>
        <span>·</span>
        <span>{author}</span>
      </div>
    </div>
  );
}

export default function CommunityPage({ onSignup }) {
  const navigate    = useNavigate();
  const searchTimer = useRef(null);

  const [posts, setPosts]           = useState([]);
  const [offset, setOffset]         = useState(0);
  const [hasMore, setHasMore]       = useState(false);
  const [loading, setLoading]       = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError]           = useState("");
  const [activeTag, setActiveTag]   = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  // Fetch posts when tag or debounced search changes
  useEffect(() => {
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError("");

      let query = supabase
        .from("community_posts")
        .select("*, users(full_name)")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .range(0, PAGE_SIZE - 1);

      if (activeTag)   query = query.contains("tags", [activeTag]);
      if (searchTerm)  query = query.ilike("title", `%${searchTerm}%`);

      const { data, error: err } = await query;

      if (cancelled) return;

      if (err) {
        setError("Something went wrong loading the community. Please try again.");
      } else {
        setPosts(data ?? []);
        setOffset(data?.length ?? 0);
        setHasMore((data?.length ?? 0) === PAGE_SIZE);
      }
      setLoading(false);
    };

    fetch();
    return () => { cancelled = true; };
  }, [activeTag, searchTerm]);

  // Debounce search input → searchTerm
  const handleSearchChange = e => {
    const val = e.target.value;
    setSearchInput(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearchTerm(val), 300);
  };

  const loadMore = async () => {
    setLoadingMore(true);

    let query = supabase
      .from("community_posts")
      .select("*, users(full_name)")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (activeTag)  query = query.contains("tags", [activeTag]);
    if (searchTerm) query = query.ilike("title", `%${searchTerm}%`);

    const { data } = await query;
    setPosts(prev => [...prev, ...(data ?? [])]);
    setOffset(prev => prev + (data?.length ?? 0));
    setHasMore((data?.length ?? 0) === PAGE_SIZE);
    setLoadingMore(false);
  };

  const handleAsk = () => {
    if (!isLoggedIn) {
      if (onSignup) onSignup();
      else navigate("/register");
      return;
    }
    navigate("/community/ask");
  };

  const selectTag = tag => setActiveTag(prev => prev === tag ? null : tag);

  return (
    <>
      <Helmet>
        <title>Community | From Broken To Better</title>
        <meta name="description" content="Real questions and answers from people navigating separation and divorce in India. Join the From Broken To Better community." />
        <link rel="canonical" href="https://frombrokentobetter.com/community" />
        <meta property="og:type"         content="website" />
        <meta property="og:url"          content="https://frombrokentobetter.com/community" />
        <meta property="og:title"        content="Community | From Broken To Better" />
        <meta property="og:description"  content="Real questions and answers from people navigating separation and divorce." />
        <meta property="og:image"        content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:site_name"    content="From Broken To Better" />
        <meta property="og:locale"       content="en_IN" />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="Community | From Broken To Better" />
        <meta name="twitter:description" content="Real questions and answers from people navigating separation and divorce." />
        <meta name="twitter:image"       content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>

      <style>{styles}</style>

      <div className="comm">

        {/* Hero */}
        <section className="comm-hero">
          <div className="comm-hero-eyebrow">Community</div>
          <h1 className="comm-hero-h1">Community.</h1>
          <p className="comm-hero-sub">
            Real questions. Real answers. From people who have been there.
          </p>
        </section>

        {/* Controls */}
        <div className="comm-controls">
          <div className="comm-search-wrap">
            <span className="comm-search-icon">⌕</span>
            <input
              className="comm-search"
              type="text"
              placeholder="Search questions…"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          <div className="comm-tags-wrap">
            <div className="comm-tags">
              <button
                className={`comm-tag ${activeTag === null ? "comm-tag-active" : ""}`}
                onClick={() => setActiveTag(null)}
              >
                All
              </button>
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  className={`comm-tag ${activeTag === tag ? "comm-tag-active" : ""}`}
                  onClick={() => selectTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="comm-grid-wrap">
          <div className="comm-grid">

            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : error ? (
              <div className="comm-state">
                <div className="comm-state-icon">🌿</div>
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="comm-state">
                <div className="comm-state-icon">🌿</div>
                <h3>No questions yet</h3>
                <p>
                  {activeTag || searchTerm
                    ? "No questions yet in this category. Be the first to ask."
                    : "The community is just getting started. Be the first to ask a question."}
                </p>
              </div>
            ) : (
              posts.map(post => (
                <QuestionCard
                  key={post.id}
                  post={post}
                  isLoggedIn={isLoggedIn}
                  onClick={() => navigate(`/community/${post.slug}`)}
                />
              ))
            )}

          </div>

          {hasMore && !loading && (
            <div className="comm-loadmore-wrap">
              <button className="comm-loadmore" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? "Loading…" : "Load More"}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* FAB */}
      <button className="comm-fab" onClick={handleAsk}>
        Ask a Question →
      </button>
    </>
  );
}
