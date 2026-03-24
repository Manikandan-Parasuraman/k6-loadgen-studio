import React, { useEffect, useState } from 'react';

export default function History({ onView }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/history')
            .then(res => res.json())
            .then(data => {
                setHistory(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="history-container">
            <div className="title-group">
                <h2>Execution History</h2>
                <p>Review and analyze past performance test iterations.</p>
            </div>

            {loading ? (
                <div className="loader"></div>
            ) : history.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <p>No tests have been executed yet.</p>
                </div>
            ) : (
                <div className="history-list">
                    {history.map(item => (
                        <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <div>
                                <h4 style={{ color: 'var(--primary-navy)' }}>{item.summary}</h4>
                                <small style={{ color: 'var(--text-secondary)' }}>ID: {item.id}</small>
                            </div>
                            <button className="btn btn-outline btn-sm" onClick={() => onView(item.id)}>View Insights</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
