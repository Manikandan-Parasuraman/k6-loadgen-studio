import subprocess
import os
import json


def run_k6(config):
    script = f"""
import http from 'k6/http';
import {{ sleep }} from 'k6';

export let options = {{
  vus: {config['vus']},
  duration: '{config['duration']}',
}};

export default function () {{
  http.{config['method'].lower()}('{config['url']}');
  sleep(1);
}}
"""

    with open("test.js", "w") as f:
        f.write(script)

    result = subprocess.run([
        "docker", "run", "--rm",
        "-v", f"{os.getcwd()}:/scripts",
        "grafana/k6",
        "run", "/scripts/test.js"
    ], capture_output=True, text=True)

    return {
        "output": result.stdout
    }