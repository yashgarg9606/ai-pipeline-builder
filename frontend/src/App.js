import { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './App.css';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onContinue={() => setShowWelcome(false)} />;
  }

  return (
    <div className="app">
      <div className="app-layout">
        <aside className="app-toolbar">
          <PipelineToolbar />
        </aside>
        <main className="app-main">
          <div className="app-canvas">
            <PipelineUI />
          </div>
          <footer className="app-footer">
            <SubmitButton />
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
