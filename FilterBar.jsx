import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    budgetRange: 'all',
    skillLevel: 'all',
    timeframe: 'all',
    geography: 'all'
  });

  const categories = [
    'all',
    'LLM Integration',
    'AI Agents',
    'Model Training',
    'Data Processing',
    'Prompt Engineering',
    'AI Automation',
    'Computer Vision',
    'NLP Tasks'
  ];

  const budgetRanges = [
    'all',
    'Under $500',
    '$500-$1000',
    '$1000-$5000',
    '$5000+'
  ];

  const skillLevels = [
    'all',
    'Beginner',
    'Intermediate',
    'Expert'
  ];

  const timeframes = [
    'all',
    'Less than 1 week',
    '1-2 weeks',
    '2-4 weeks',
    '1-3 months',
    '3+ months'
  ];

  const geographies = [
    'all',
    'east-us',
    'mid-us',
    'west-us',
    'ex-us'
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Category</label>
        <select 
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Budget</label>
        <select
          value={filters.budgetRange}
          onChange={(e) => handleFilterChange('budgetRange', e.target.value)}
        >
          {budgetRanges.map(range => (
            <option key={range} value={range}>
              {range === 'all' ? 'All Budgets' : range}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Skill Level</label>
        <select
          value={filters.skillLevel}
          onChange={(e) => handleFilterChange('skillLevel', e.target.value)}
        >
          {skillLevels.map(level => (
            <option key={level} value={level}>
              {level === 'all' ? 'All Levels' : level}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Timeframe</label>
        <select
          value={filters.timeframe}
          onChange={(e) => handleFilterChange('timeframe', e.target.value)}
        >
          {timeframes.map(time => (
            <option key={time} value={time}>
              {time === 'all' ? 'All Timeframes' : time}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Location</label>
        <select
          value={filters.geography}
          onChange={(e) => handleFilterChange('geography', e.target.value)}
        >
          {geographies.map(geo => (
            <option key={geo} value={geo}>
              {geo === 'all' ? 'All Locations' : 
               geo === 'east-us' ? 'Eastern US' :
               geo === 'mid-us' ? 'Central US' :
               geo === 'west-us' ? 'Western US' :
               'International'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar; 