import { useState } from 'react';

const features = [
  '9 Custom Node Types',
  'Configuration-Driven Node Architecture',
  'Dynamic Variable Handles',
  'Pipeline DAG Validation (FastAPI Backend)',
];

export const WelcomeScreen = ({ onContinue }) => {
  const [leaving, setLeaving] = useState(false);

  const handleContinue = () => {
    setLeaving(true);
    setTimeout(onContinue, 150);
  };

  return (
    <div className={`welcome ${leaving ? 'welcome--leaving' : ''}`}>
      <div className="welcome-card">
        <span className="welcome-accent" aria-hidden="true" />
        <h1 className="welcome-title">Pipeline Builder</h1>
        <p className="welcome-subtitle">Technical Assessment</p>
        <p className="welcome-subtitle-company">VectorShift — Frontend Engineering</p>
        <p className="welcome-description">
          A configurable React Flow workflow editor showcasing reusable node abstractions,
          dynamic handles, and backend DAG validation.
        </p>
        <div className="welcome-features">
          <span className="welcome-features-label">Features</span>
          <div className="welcome-features-card">
            {features.map((feature) => (
              <div key={feature} className="welcome-feature">
                <span className="welcome-check">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <button type="button" className="welcome-btn" onClick={handleContinue}>
          Continue →
        </button>
        <footer className="welcome-footer">
          <span className="welcome-credit">Built by Yash Garg</span>
          <span className="welcome-stack">React • React Flow • FastAPI</span>
        </footer>
      </div>
    </div>
  );
};

export default WelcomeScreen;
