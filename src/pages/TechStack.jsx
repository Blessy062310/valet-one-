import React from 'react';
import { Layers } from 'lucide-react';

export default function TechStack() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Architecture & Languages</h1>
        <p className="text-muted">Technical overview of the Valet One application.</p>
      </div>

      <div className="glass-panel stat-card" style={{ gap: '16px' }}>
        <div className="flex-row" style={{ gap: '12px' }}>
          <Layers size={28} color="#45f3ff" />
          <h2>Frontend Stack</h2>
        </div>
        <ul style={{ paddingLeft: '24px', color: 'var(--text-main)', lineHeight: '1.8' }}>
          <li><strong>React.js (JavaScript/JSX)</strong>: The core UI library used to build the interactive user interface.</li>
          <li><strong>Vite</strong>: The blazing fast build tool and development server used to bundle the application.</li>
          <li><strong>React Router v6</strong>: Handles client-side navigation between views seamlessly without reloading the browser.</li>
          <li><strong>Vanilla CSS (CSS3)</strong>: Used for styling, specifically implementing CSS variables and backdrop-filter for the Glassmorphism aesthetic. No Tailwind or external frameworks were used per requirements.</li>
          <li><strong>Recharts</strong>: A composable charting library built on React components used for the dashboard graph.</li>
          <li><strong>Lucide React</strong>: Beautiful, clean SVG icons used throughout the application.</li>
        </ul>
      </div>

      <div className="glass-panel stat-card" style={{ gap: '16px' }}>
        <div className="flex-row" style={{ gap: '12px' }}>
          <Layers size={28} color="#ff3c78" />
          <h2>Backend / Storage Architecture</h2>
        </div>
        <div style={{ padding: '16px', background: 'rgba(255, 60, 120, 0.05)', borderRadius: '8px', border: '1px solid rgba(255, 60, 120, 0.2)' }}>
          <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
            <strong>Note:</strong> This is currently running as a standalone client-side prototype.
          </p>
        </div>
        <ul style={{ paddingLeft: '24px', color: 'var(--text-main)', lineHeight: '1.8' }}>
          <li><strong>Local Storage API</strong>: The browser's native API is used to mock database interactions. This safely persists the User's Nominees and Legacy Configurations within the browser session for demonstration purposes.</li>
          <li><strong>Proposed Production Backend</strong>: In a real-world scenario, this frontend would communicate with a <strong>Node.js (Express)</strong> backend or a <strong>Python (FastAPI)</strong> service, utilizing a database like PostgreSQL for structured financial data and a blockchain smart contract for trustless legacy transfers.</li>
        </ul>
      </div>
    </div>
  );
}
