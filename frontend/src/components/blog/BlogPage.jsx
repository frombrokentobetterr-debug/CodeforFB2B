import { Helmet } from "react-helmet-async";
import { ARTICLES } from "../../data/articles";

export default function BlogPage({ onReadArticle }) {
  return (
    <>
      <Helmet>
        <title>The Journey — Stories and Insights | From Broken To Better</title>
        <meta name="description" content="Real stories from people who have walked through separation and come out the other side. You are not alone in this." />
        <link rel="canonical" href="https://frombrokentobetter.com/journal" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://frombrokentobetter.com/journal" />
        <meta property="og:title" content="The Journey — Stories and Insights | From Broken To Better" />
        <meta property="og:description" content="Real stories from people who have walked through separation and come out the other side. You are not alone in this." />
        <meta property="og:image" content="https://frombrokentobetter.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="From Broken To Better" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://frombrokentobetter.com/journal" />
        <meta name="twitter:title" content="The Journey — Stories and Insights | From Broken To Better" />
        <meta name="twitter:description" content="Real stories from people who have walked through separation and come out the other side. You are not alone in this." />
        <meta name="twitter:image" content="https://frombrokentobetter.com/og-image.jpg" />
      </Helmet>
      <div className="blog-page">
        <div className="blog-header">
          <h1 className="section-title">The Journal</h1>
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
    </>
  );
}