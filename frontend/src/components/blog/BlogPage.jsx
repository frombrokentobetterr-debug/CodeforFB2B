import { ARTICLES } from "../../data/articles";

export default function BlogPage({ onReadArticle }) {
  return (
    <div className="blog-page">
      <div className="blog-header">
        <div className="section-tag">Healing Journal</div>
        <h1 className="section-title">The Journey</h1>
      </div>
      <div className="blog-grid">
        {ARTICLES.map(article => (
          <div key={article.id} className="blog-card" onClick={() => onReadArticle(article)}>
            <div className="blog-card-img">{article.emoji}</div>
            <div className="blog-card-body">
              <span className="blog-tag" style={{ background: article.tagColor, color: article.tagTextColor }}>
                {article.tag}
              </span>
              <div className="blog-card-title">{article.title}</div>
              <div className="blog-card-summary">{article.summary.slice(0, 100)}...</div>
              <div className="blog-card-meta">
                <span>📅 {article.date}</span>
                <span>🕐 {article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}