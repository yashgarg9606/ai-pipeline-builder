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
      <div className="welcome-inner">
        <h1 className="welcome-title">Pipeline Builder</h1>
        <p className="welcome-subtitle">Technical Assessment Submission for VectorShift</p>
        <p className="welcome-description">
          A React Flow based workflow editor demonstrating reusable node abstraction, dynamic handles, and backend DAG validation.
        </p>
        <div className="welcome-card">
          {features.map((feature) => (
            <div key={feature} className="welcome-feature">
              <span className="welcome-check">✓</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <button type="button" className="welcome-btn" onClick={handleContinue}>
          Continue to Builder →
        </button>
      </div>
      <span className="welcome-credit">Yash Garg • July 2026</span>
    </div>
  );
};

export default WelcomeScreen;
