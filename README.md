# SapientFc

A Docker Compose setup for running the frontend, backend, Jenkins, and SonarQube services.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Docker Commands](#docker-commands)

## Prerequisites

Ensure you have the following installed:

- Docker (v20+)
- Docker Compose v2

## Quick Start

Clone the repository and navigate into it:

```bash
git clone https://github.com/<your-org>/sapient-fc.git
cd sapient-fc
```

## Docker Commands

### Start Frontend & Backend

```bash
docker compose up -d
```

### Start Jenkins & SonarQube

```bash
cd ci
docker compose up -d
```

---

For more details on configuration or troubleshooting, consult each service’s README under `apps/` or `ci/` folders.
