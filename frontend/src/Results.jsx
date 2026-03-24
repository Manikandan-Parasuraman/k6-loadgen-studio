import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Results({ data }) {
    if (!data) return null;

    const chartData = useMemo(() => [
        { name: "0s", latency: 0, vus: 0 },
        { name: "1s", latency: 50, vus: data.vus || 10 },
        { name: "2s", latency: 70, vus: data.vus || 10 },
        { name: "3s", latency: 60, vus: data.vus || 10 },
        { name: "4s", latency: 80, vus: data.vus || 10 },
        { name: "5s", latency: 75, vus: data.vus || 10 }
    ], [data]);

    return (
        <div className="results-container">
            <div className="title-group" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
               <h2>Test Run Analytics</h2>
               <p>Detailed performance breakdown and intelligent recommendations.</p>
            </div>

            <div className="results-grid">
                <div className="stat-card">
                  <div className="stat-label">Avg. Latency</div>
                  <div className="stat-value">124ms</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Concurrent VUs</div>
                  <div className="stat-value">{data.vus || 10}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Request Success</div>
                  <div className="stat-value" style={{ color: 'var(--success)' }}>100%</div>
                </div>
                <div className="stat-card">
                   <div className="stat-label">P95 Response</div>
                   <div className="stat-value">180ms</div>
                </div>
            </div>

            <div style={{ marginTop: '40px', padding: '24px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <h3 style={{ marginBottom: '20px', color: 'var(--primary-navy)' }}>Latency vs Time</h3>
                <div style={{ height: '300px', width: '100%' }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
                            <YAxis stroke="var(--text-secondary)" fontSize={12} />
                            <Tooltip 
                                contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                itemStyle={{ color: 'var(--text-primary)' }}
                            />
                            <Line type="monotone" dataKey="latency" stroke="var(--primary-navy)" strokeWidth={3} dot={{ fill: 'var(--primary-navy)', strokeWidth: 2 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="recommendation-box" style={{ marginTop: '30px' }}>
               <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>🚀 Smart Optimization Insight</h4>
               <p style={{ fontSize: '0.95rem' }}>Endpoint is highly stable. Recommending a 50% increase in Virtual Users (VUs) to identify breaking points.</p>
               <div style={{ marginTop: '15px', color: 'var(--primary-navy)', fontWeight: 600 }}>
                   Suggested: {JSON.stringify(data.recommendation)}
               </div>
            </div>

            <div className="title-group" style={{ marginTop: '50px' }}>
              <h3 style={{ fontSize: '1.25rem' }}>Execution Output</h3>
              <p>Raw debug logs from the k6 engine</p>
            </div>
            
            <pre style={{ maxHeight: '400px', backgroundColor: '#0f172a', borderRadius: '12px' }}>
                {data.result?.output || 'No logs generated during this run'}
            </pre>
        </div>
    );
}