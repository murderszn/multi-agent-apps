const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="post-list">
        <div className="post-card">
          <p>No posts available. Be the first to create a post!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <div className="post-header-main">
              <h3>{post.title}</h3>
              <div className="post-meta-top">
                <span className="category-badge">{post.category}</span>
                <span className={`skill-level ${post.skillLevel}`}>
                  {post.skillLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="post-content">
            <p className="post-description">{post.description}</p>
            
            <div className="post-details">
              <div className="detail-item">
                <span className="detail-label">Budget:</span>
                <span className="budget-value">{post.budget}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Timeline:</span>
                <span className="timeframe-value">{post.timeframe}</span>
              </div>
            </div>

            <div className="tech-stack">
              <span className="detail-label">Required Skills:</span>
              <div className="tech-badges">
                {post.techStack?.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="post-footer">
            <div className="post-contact">
              <span className="detail-label">Contact:</span>
              <a href={`mailto:${post.contactEmail}`}>{post.contactEmail}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;