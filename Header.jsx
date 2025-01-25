const Header = ({ onCreatePost, onShowRules }) => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-left">
          <h1>AUXILIUM AI <span className="title-heart">♥</span></h1>
          <p className="header-tagline">The Marketplace for AI Development & Resources</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={onShowRules}
            className="rules-button"
          >
            Guidelines
          </button>
          <button 
            onClick={onCreatePost} 
            className="create-button"
          >
            <span className="button-icon">+</span>
            Post New Task
          </button>
        </div>
      </div>
      <div className="header-backdrop"></div>
    </header>
  );
};

export default Header;