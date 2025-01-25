import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

const initialPosts = [
  {
    id: uuidv4(),
    title: "Need GPT-4 Integration Expert",
    description: "Looking for someone to help integrate GPT-4 API into our existing Node.js backend. Must have experience with AI workflows.",
    category: "LLM Integration",
    date: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Custom AI Chatbot Development",
    description: "Seeking developer to build custom chatbot using LangChain and RAG architecture. Python experience required.",
    category: "AI Development",
    date: new Date().toISOString()
  }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const addPost = (newPost) => {
    setPosts([{ ...newPost, id: uuidv4(), date: new Date().toISOString() }, ...posts]);
    setShowCreateForm(false);
  };

  return (
    <div className="container">
      <Header onCreatePost={() => setShowCreateForm(true)} />
      {showCreateForm && <CreatePost onAddPost={addPost} onCancel={() => setShowCreateForm(false)} />}
      <PostList posts={posts} />
    </div>
  );
}

export default App;