import requests
import json

url = "http://localhost:8000/run-test"
payload = {
    "url": "https://httpbin.org/get",
    "method": "GET",
    "vus": 2,
    "duration": "5s"
}

try:
    print(f"Sending request to {url}...")
    response = requests.post(url, json=payload)
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
