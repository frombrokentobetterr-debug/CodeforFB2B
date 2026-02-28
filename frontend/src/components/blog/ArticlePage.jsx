export default function ArticlePage({ article, onBack, onStart }) {
  return (
    <div className="article-page">
      <button className="article-back" onClick={onBack}>← Back to Journal</button>

      <span
        className="article-tag"
        style={{ background: article.tagColor, color: article.tagTextColor }}
      >
        {article.tag}
      </span>

      <h1 className="article-title">{article.title}</h1>

      <div className="article-meta">
        <span>📅 {article.date}</span>
        <span>🕐 {article.readTime}</span>
      </div>

      <p className="article-summary">{article.summary}</p>

      {article.content.map((section, i) => (
        <div key={i} className="article-section">
          <h2 className="article-heading">{section.heading}</h2>
          <p className="article-body">{section.body}</p>
        </div>
      ))}

      <div className="article-divider" />

      <div className="article-cta">
        <div style={{ fontSize: 40, marginBottom: 12 }}>🌿</div>
        <div className="article-cta-title">Ready to begin your healing journey?</div>
        <div className="article-cta-sub">
          Take our free 6-question assessment and receive your personalised healing path — designed just for you.
        </div>
        <button className="btn-primary" onClick={onStart}>
          Get My Healing Path — Free
        </button>
      </div>
    </div>
  );
}
