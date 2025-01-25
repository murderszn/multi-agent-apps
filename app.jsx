import { useState } from 'react';
import Header from './components/Header.jsx';
import FilterBar from './components/FilterBar.jsx';
import PostList from './components/PostList.jsx';
import CreatePost from './components/CreatePost.jsx';
import NewsMarquee from './components/NewsMarquee';
import RulesModal from './components/RulesModal';
import Footer from './components/Footer';
import sampleData from './data/samplePosts.json';

function App() {
  const [posts] = useState(sampleData.posts);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    budgetRange: 'all',
    skillLevel: 'all',
    timeframe: 'all',
    geography: 'all'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredPosts = posts.filter(post => {
    return (filters.category === 'all' || post.category === filters.category) &&
           (filters.budgetRange === 'all' || post.budget === filters.budgetRange) &&
           (filters.skillLevel === 'all' || post.skillLevel === filters.skillLevel) &&
           (filters.timeframe === 'all' || post.timeframe === filters.timeframe) &&
           (filters.geography === 'all' || post.geography === filters.geography);
  });

  return (
    <>
      <div className="container">
        <Header 
          onCreatePost={() => setShowCreateForm(true)} 
          onShowRules={() => setShowRules(true)}
        />
        <NewsMarquee />
        <FilterBar onFilterChange={handleFilterChange} />
        {showCreateForm && (
          <CreatePost 
            onClose={() => setShowCreateForm(false)}
            onSubmit={() => setShowCreateForm(false)}
          />
        )}
        {showRules && <RulesModal onClose={() => setShowRules(false)} />}
        <PostList 
          posts={filteredPosts}
          currentUserId="sample1"
        />
      </div>
      <Footer />
    </>
  );
}

export default App;