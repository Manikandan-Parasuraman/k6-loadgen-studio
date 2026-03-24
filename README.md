# k6 LoadGen Studio

![CI](https://github.com/Manikandan-Parasuraman/k6-loadgen-studio/actions/workflows/k6.yml/badge.svg)
![Docker](https://img.shields.io/badge/docker-ready-blue?logo=docker)
![k6](https://img.shields.io/badge/k6-load--testing-7D64FF?logo=k6)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688?logo=fastapi)
![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react)
![ChromaDB](https://img.shields.io/badge/vector--db-ChromaDB-purple)
![Redis](https://img.shields.io/badge/queue-Redis-red?logo=redis)
![License](https://img.shields.io/github/license/Manikandan-Parasuraman/k6-loadgen-studio)
![Stars](https://img.shields.io/github/stars/Manikandan-Parasuraman/k6-loadgen-studio?style=social)

---

## Overview

**k6 LoadGen Studio** is a modern, full-stack performance testing platform built for developers, QA engineers, and DevOps teams.

It combines:

* UI-driven test creation
* Docker-isolated k6 execution
* Vector intelligence (ChromaDB)
* Smart load recommendations
* Postman collection auto-discovery
* Shareable performance reports
* CI/CD validation with thresholds

---

## Key Features

### Performance Testing

* Generate k6 scripts from UI
* Run tests in isolated Docker containers
* Real-time execution results

### Vector Intelligence (ChromaDB)

* Stores:

  * API endpoint
  * latency
  * error rate
  * VUs & duration
* Enables:

  * Similar test detection
  * Smart recommendations

### Smart Recommendation Engine

* Heuristic-based optimization:

  * Reduce load on failures
  * Increase load on stable endpoints
* Suggests:

  * Optimal VUs
  * Duration

### API Auto Discovery

* Upload Postman collections
* Supports:

  * Environments
  * Auth headers (Bearer, Basic)
  * Request body

### Report Sharing System

* Persistent reports
* Public URL:

  ```
  /report/{id}
  ```
* Includes:

  * Metrics
  * Charts
  * JSON export

### Developer-Friendly UI

* Monaco JSON editor
* Navigation: Home, History, Reports
* Config presets: Smoke, Load, Stress
* Recharts-based visualization

### Report Export System

* Professional PDF generation
* Integrated charts and metrics
* Shared public links for collaboration

### CI/CD Integration

* GitHub Actions support
* Threshold validation:

  ```
  http_req_duration: ['p(95)<500']
  ```

---

## Architecture

```
Frontend (React + Monaco + Recharts)
        ↓
Backend (FastAPI)
        ↓
Queue System (Redis + Celery)
        ↓
k6 Runner (Docker Isolated)
        ↓
Vector DB (ChromaDB)
        ↓
Report Storage
```

---

## Architecture Decision Record (ADR)

### Why k6?

* Lightweight and scriptable
* CI/CD friendly
* Modern alternative to legacy tools

### Why Docker Execution?

* Complete isolation
* Scalable execution
* Safe test runs

### Why ChromaDB?

* Enables semantic search
* Stores structured performance metadata
* Powers intelligent recommendations

### Why Monaco Editor?

* Developer-grade editing experience
* JSON validation and formatting

---

## Scalability Plan

### Phase 1

* Local execution
* Single node backend

### Phase 2

* Queue-based execution (Redis + Celery)
* Multi-user support

### Phase 3

* Distributed k6 execution
* Kubernetes scaling
* Observability integration (Prometheus + Grafana)

---

## Cost Optimization Strategy

* Local vector DB (ChromaDB)
* On-demand Docker execution
* Minimal infrastructure requirements
* GitHub Actions for CI (no extra cost)

---

## Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/Manikandan-Parasuraman/k6-loadgen-studio.git
cd k6-loadgen-studio
```

---

### 2. Run with Docker

```bash
docker-compose up --build
```

---

### 3. Access

* Frontend → http://localhost:3000
* Backend → http://localhost:8000

---

## Example Test Config

```json
{
  "url": "https://api.example.com/users",
  "method": "GET",
  "vus": 50,
  "duration": "30s"
}
```

---

## Recommendation Logic

```python
if error_rate > 0.02:
    vus = prev_vus * 0.7
elif latency < 200:
    vus = prev_vus * 1.5
```

---

## API Endpoints

| Endpoint                  | Description               |
| ------------------------- | ------------------------- |
| POST /run-test            | Run performance test      |
| GET /report/{id}          | Get shared report         |
| POST /upload-postman      | Parse Postman collection  |
| GET /recommend/{endpoint} | Get config recommendation |

---

## GitHub Actions (CI)

```yaml
- name: Validate Threshold
  run: |
    if grep -q "thresholds have been crossed" result.txt; then
      exit 1
    fi
```

---

## Final Capabilities

- UI-based performance testing
- Docker-isolated execution
- Vector intelligence (ChromaDB)
- Smart recommendation engine
- Postman API auto-discovery
- Public report sharing
- Professional PDF export
- CI/CD performance validation

---

## Tech Stack

* **Frontend**: React, Monaco Editor, Recharts
* **Backend**: FastAPI
* **Queue**: Redis + Celery
* **Load Testing**: k6
* **Vector DB**: ChromaDB
* **Reporting**: ReportLab (PDF)
* **CI/CD**: GitHub Actions
* **Containerization**: Docker

---

## License

MIT License

---

## Support

If you find this project useful:

* Star the repo
* Share with your team
* Contribute improvements

---

## Project Status

**Production-ready | Portfolio-grade | Architect-level implementation**
