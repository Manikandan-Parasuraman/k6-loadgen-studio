import React, { useEffect, useState } from 'react';

export default function Report({ id, showDownload = true }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

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

    const handleCopy = () => {
        const url = `${window.location.origin}/report/${id}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return <div>Fetching report data...</div>;
    if (!data) return null;

    return (
        <div className="report-container">
            <div className="title-group">
                <h3>Shared Link Generated</h3>
                <p>Public report available for team analysis.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <code style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>/report/{id}</code>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-outline btn-sm" onClick={handleCopy}>
                        {copied ? '✓ Copied!' : 'Copy URL'}
                    </button>
                    {showDownload && (
                        <a 
                            href={`http://localhost:8000/report/${id}/pdf`} 
                            className="btn btn-primary btn-sm" 
                            target="_blank" 
                            rel="noreferrer"
                            style={{ textDecoration: 'none' }}
                        >
                            Download PDF
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}