import { useState } from 'react';

const CreatePost = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'LLM Integration',
    budget: '$1000-$5000',
    skillLevel: 'Intermediate',
    timeframe: '2-4 weeks',
    contactEmail: '',
    techStack: '',
    geography: 'east-us'
  });

  const [error, setError] = useState('');

  const categories = [
    'LLM Integration',
    'AI Agents',
    'Model Training',
    'Data Processing',
    'Prompt Engineering',
    'AI Automation',
    'Computer Vision',
    'NLP Tasks',
    'Other AI Services'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (formData.title.length < 10) {
        throw new Error('Title should be at least 10 characters long');
      }
      if (formData.description.length < 30) {
        throw new Error('Description should be at least 30 characters long');
      }
      if (!formData.techStack.length) {
        throw new Error('Please add at least one technology');
      }
      
      const techStackArray = formData.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      onSubmit({
        ...formData,
        techStack: techStackArray
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Create New Task</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="E.g., Need GPT-4 Integration Expert"
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Budget Range:</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="E.g., $1000-5000"
              required
            />
          </div>
          <div>
            <label>Contact Email:</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label>Required Tech Stack:</label>
            <input
              type="text"
              name="techStack"
              placeholder="Add technologies (comma-separated)"
              value={formData.techStack}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Skill Level Required:</label>
            <select
              name="skillLevel"
              value={formData.skillLevel}
              onChange={handleChange}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div>
            <label>Expected Timeframe:</label>
            <select
              name="timeframe"
              value={formData.timeframe}
              onChange={handleChange}
            >
              <option value="Less than 1 week">Less than 1 week</option>
              <option value="1-2 weeks">1-2 weeks</option>
              <option value="2-4 weeks">2-4 weeks</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3+ months">3+ months</option>
            </select>
          </div>
          <div>
            <label>Location:</label>
            <select
              name="geography"
              value={formData.geography}
              onChange={handleChange}
              required
            >
              <option value="east-us">Eastern US</option>
              <option value="mid-us">Central US</option>
              <option value="west-us">Western US</option>
              <option value="ex-us">International</option>
            </select>
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your AI task requirements, timeline, and any specific skills needed..."
              required
              rows={4}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-button">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;