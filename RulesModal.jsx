import { useState } from 'react';

const RulesModal = ({ onClose }) => {
  return (
    <div className="rules-modal-backdrop">
      <div className="rules-modal">
        <div className="rules-header">
          <h2>Community Guidelines & Disclosures</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="rules-content">
          <section className="rules-section">
            <h3>Community Rules</h3>
            <ol>
              <li>Be professional and respectful in all interactions</li>
              <li>No spamming or duplicate postings</li>
              <li>Provide accurate and detailed project requirements</li>
              <li>Keep all initial discussions in the public forum</li>
              <li>No soliciting outside of task posts</li>
              <li>Maintain reasonable price expectations</li>
              <li>Report any suspicious or fraudulent behavior</li>
            </ol>
          </section>

          <section className="rules-section">
            <h3>Task Posting Guidelines</h3>
            <ul>
              <li>Clear project scope and deliverables</li>
              <li>Realistic budget ranges</li>
              <li>Specific technical requirements</li>
              <li>Reasonable timelines</li>
              <li>Professional communication</li>
            </ul>
          </section>

          <section className="rules-section">
            <h3>Disclosures</h3>
            <div className="disclosure-item">
              <h4>Platform Role</h4>
              <p>AUXILIUM AI acts as a platform for connecting AI developers and clients. We do not guarantee outcomes or participate in transactions.</p>
            </div>
            <div className="disclosure-item">
              <h4>Responsibility</h4>
              <p>Users are responsible for their own due diligence when entering into agreements. We recommend thorough vetting and clear written agreements.</p>
            </div>
            <div className="disclosure-item">
              <h4>Privacy</h4>
              <p>Public posts are visible to all users. Do not share sensitive information in public discussions.</p>
            </div>
          </section>

          <section className="rules-section">
            <h3>Safety Tips</h3>
            <ul>
              <li>Verify identities before making agreements</li>
              <li>Use secure payment methods</li>
              <li>Document all agreements in writing</li>
              <li>Start with small milestones for large projects</li>
              <li>Keep communication professional and documented</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesModal; 