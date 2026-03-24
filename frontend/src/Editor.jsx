import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const presets = {
    smoke: { vus: 5, duration: "5s" },
    load: { vus: 50, duration: "30s" },
    stress: { vus: 200, duration: "1m" }
};

export default function CodeEditor({ onRun, loading }) {
    const [value, setValue] = useState(JSON.stringify({
        url: "https://jsonplaceholder.typicode.com/todos/1",
        method: "GET",
        vus: 10,
        duration: "10s"
    }, null, 2));

    const applyPreset = (type) => {
        try {
            const config = JSON.parse(value);
            config.vus = presets[type].vus;
            config.duration = presets[type].duration;
            setValue(JSON.stringify(config, null, 2));
        } catch (e) {
            alert('Invalid JSON in editor');
        }
    };

    return (
        <div className="editor-container">
            <div className="title-group">
                <h3>Test Scenario Designer</h3>
                <p>Configure the load test parameters using JSON. Presets are available for quick start.</p>
            </div>

            <div className="presets">
                <button className="btn btn-outline btn-sm" onClick={() => applyPreset('smoke')}>Smoke Test</button>
                <button className="btn btn-outline btn-sm" onClick={() => applyPreset('load')}>Load Test</button>
                <button className="btn btn-outline btn-sm" onClick={() => applyPreset('stress')}>Stress Test</button>
            </div>

            <div className="editor-wrapper">
                <Editor
                    height="400px"
                    defaultLanguage="json"
                    theme="light"
                    value={value}
                    onChange={(v) => setValue(v)}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineHeight: 1.5,
                        fontFamily: 'JetBrains Mono',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        scrollbar: {
                            verticalScrolling: 'visible',
                            horizontalScrolling: 'visible'
                        }
                    }}
                />
            </div>

            <div className="controls">
                <button 
                  className="btn btn-primary" 
                  onClick={() => onRun(JSON.parse(value))}
                  disabled={loading}
                >
                  {loading ? <span className="loader" style={{borderTopColor: 'white'}}></span> : 'Execute Test'}
                </button>
            </div>
        </div>
    );
}