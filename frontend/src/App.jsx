import React, { useState, useEffect } from 'react';
import CodeEditor from './Editor';
import Results from './Results';
import Report from './Report';
import History from './History';
import './index.css';

function Home({ results, setResults, loading, handleRun, error }) {
  return (
    <main className="app-container">
      <div className="card">
        <CodeEditor onRun={handleRun} loading={loading} />
      </div>

      {error && (
        <div className="card" style={{ borderLeftColor: 'var(--error)', borderLeftWidth: '6px' }}>
           <h3 style={{ color: 'var(--error)', marginBottom: '8px' }}>⚡ Connection Interrupted</h3>
           <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <div className="loader" style={{ width: '40px', height: '40px', marginBottom: '20px' }}></div>
          <h3>Orchestrating Environment...</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Instantiating isolated dockerized k6 environment for scenario execution.</p>
        </div>
      )}

      {!loading && results && (
        <div className="card">
          <Results data={results} />
        </div>
      )}

      {!loading && results && results.report_id && (
        <div className="card">
          <Report id={results.report_id} />
        </div>
      )}
    </main>
  );
}

function Insights({ id, onBack, source }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/report/${id}`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="app-container"><div className="loader"></div></div>;

  return (
    <main className="app-container">
      <button className="btn btn-outline btn-sm" onClick={onBack} style={{ marginBottom: '20px' }}>← Back to {source === 'history' ? 'History' : 'Reports'}</button>
      <div className="card">
        <Results data={{ ...data, vus: 10, recommendation: { vus: 15, duration: '10s' } }} />
      </div>
      <div className="card">
        <Report id={id} showDownload={source === 'reports'} />
      </div>
    </main>
  );
}

function App() {
  const [view, setView] = useState('home');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [source, setSource] = useState('history');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/report/')) {
      const id = path.split('/')[2];
      if (id) {
        setSelectedReportId(id);
        setSource('reports');
        setView('insights');
      }
    }
  }, []);

  const handleRun = async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/run-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      if (!response.ok) {
        throw new Error(`API Connection Failed: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInsights = (id, from) => {
    setSelectedReportId(id);
    setSource(from);
    setView('insights');
  };

  return (
    <>
      <header>
        <div style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '1.25rem', cursor: 'pointer' }} onClick={() => setView('home')}>STUDIO</div>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none', borderBottom: view === 'home' ? '2px solid white' : 'none' }} onClick={(e) => { e.preventDefault(); setView('home'); }}>Home</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', borderBottom: view === 'history' ? '2px solid white' : 'none' }} onClick={(e) => { e.preventDefault(); setView('history'); }}>History</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none', borderBottom: view === 'reports' ? '2px solid white' : 'none' }} onClick={(e) => { e.preventDefault(); setView('reports'); }}>Reports</a>
        </nav>
      </header>

      <div style={{ background: 'var(--gradient-main)', color: 'white', padding: '60px 40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '20px' }}>k6 LoadGen Studio</h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto' }}>
              Architecture-level performance testing and smart load generation engine.
          </p>
      </div>

      {view === 'home' && <Home results={results} setResults={setResults} loading={loading} handleRun={handleRun} error={error} />}
      {view === 'history' && <div className="app-container"><History onView={(id) => handleViewInsights(id, 'history')} /></div>}
      {view === 'reports' && <div className="app-container"><History onView={(id) => handleViewInsights(id, 'reports')} /></div>}
      {view === 'insights' && <Insights id={selectedReportId} source={source} onBack={() => setView(source)} />}

      <footer>
        <div style={{ marginBottom: '20px', color: 'var(--primary-navy)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>k6 LoadGen Studio</h2>
          <p>The elite load testing suite for modern engineering teams.</p>
        </div>
        <div style={{ fontSize: '0.85rem' }}>
          © 2026 Studio Engine. Designed with Professional White-Blue theme.
        </div>
      </footer>
    </>
  );
}

export default App;
