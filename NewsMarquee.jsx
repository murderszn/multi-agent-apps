import { useState, useEffect } from 'react';

const NewsMarquee = () => {
  const [news] = useState([
    "OpenAI releases GPT-5 with enhanced reasoning capabilities",
    "Google's Gemini Ultra sets new benchmark in AI performance",
    "Anthropic introduces Claude 3 with improved safety features",
    "Meta's latest AI model shows breakthrough in multimodal learning",
    "DeepMind achieves new milestone in scientific AI research",
    "Microsoft expands AI infrastructure with quantum integration"
  ]);

  return (
    <div className="news-marquee-container">
      <div className="news-marquee">
        <div className="marquee-content">
          {[...news, ...news].map((item, index) => (
            <span key={index} className="news-item">
              <span className="news-bullet">●</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsMarquee; 