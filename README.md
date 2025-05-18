# SapientFc

This project, `@sapient-fc/source`, is a monorepo managed with Nx, containing a suite of applications and libraries. It includes a frontend application, a backend API, and supporting libraries, along with CI/CD infrastructure using Docker, Jenkins, and SonarQube.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
  - [Nx Commands](#nx-commands)
  - [Docker Commands](#docker-commands)
- [Applications and Libraries](#applications-and-libraries)
- [CI/CD](#cicd)

## Overview

The SapientFc project aims to provide a full-stack solution with a focus on modern development practices, including:
- A reactive frontend built with React and Vite.
- A robust backend API built with NestJS.
- Shared libraries for common functionality and UI components.
- End-to-end testing with Playwright.
- Unit and integration testing with Jest and Vitest.
- UI component development and testing with Storybook.
- Continuous integration and quality analysis with Jenkins and SonarQube.

## Tech Stack

- **Monorepo:** Nx
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeScript
- **Testing:**
  - Playwright (E2E for frontend)
  - Jest (Backend unit/integration, shared libs)
  - Vitest (Frontend unit/integration, UI library)
- **UI Components:** Storybook
- **Linting/Formatting:** ESLint, Prettier
- **Containerization:** Docker, Docker Compose
- **CI/CD:** Jenkins, SonarQube
- **Package Manager:** pnpm

## Project Structure

The workspace is organized as follows:

- `apps/`: Contains the main applications.
  - `backend/`: NestJS backend application.
  - `backend-e2e/`: End-to-end tests for the backend.
  - `frontend/`: React frontend application.
  - `frontend-e2e/`: End-to-end tests for the frontend (using Playwright).
- `libs/`: Contains shared libraries.
  - `nest-http-client/`: A NestJS HTTP client library.
  - `offline-query-provider/`: Library for managing offline queries.
  - `shared/`: General shared utilities and types.
  - `ui-library/`: Reusable UI components with Storybook.
- `packages/`: (Currently empty, can be used for shareable npm packages).
- `ci/`: Contains Docker configurations for CI/CD tools.
  - `jenkins/`: Docker setup for Jenkins.
  - `sonar/`: Docker setup for SonarQube.
- `*.json`, `*.js`, `*.mjs`: Root configuration files for Nx, TypeScript, Jest, ESLint, PostCSS, Tailwind CSS, etc.

## Prerequisites

Ensure you have the following installed:
- Docker (v20+)
- Docker Compose v2
- Node.js (with pnpm - version specified in `package.json`'s `packageManager` field, currently pnpm@10.7.1)

To install pnpm if you haven't already:
```bash
npm install -g pnpm
```

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/<your-org>/sapient-fc.git
    cd sapient-fc
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

## Available Scripts

### Nx Commands

This project uses Nx to manage tasks like building, serving, testing, and linting applications and libraries. Here are some common commands (replace `<project-name>` with the actual project, e.g., `frontend`, `backend`, `ui-library`):

-   **Serve a project (e.g., frontend):**
    ```bash
    pnpm nx serve <project-name>
    ```
-   **Build a project:**
    ```bash
    pnpm nx build <project-name>
    ```
-   **Run tests for a project:**
    ```bash
    pnpm nx test <project-name>
    ```
-   **Run E2E tests for an application:**
    ```bash
    pnpm nx e2e <app-name>-e2e
    ```
    (e.g., `pnpm nx e2e frontend-e2e`)
-   **Lint a project:**
    ```bash
    pnpm nx lint <project-name>
    ```
-   **Run Storybook for `ui-library`:**
    ```bash
    pnpm nx storybook ui-library
    ```
-   **View project graph:**
    ```bash
    pnpm nx graph
    ```

Refer to the `project.json` file within each application or library directory for more specific targets and configurations.

### Docker Commands

#### Start Frontend & Backend

This command starts the `frontend` and `backend` services defined in the root `docker-compose.yml`.
```bash
docker compose up -d
```

#### Start Jenkins & SonarQube

These services are defined in `ci/docker-compose.yml`.
```bash
cd ci
docker compose up -d
```

## Applications and Libraries

### Applications

-   **`apps/frontend`**: The main user-facing web application built with React and Vite.
-   **`apps/backend`**: The backend API server built with NestJS.

### Libraries

-   **`libs/nest-http-client`**: A library for making HTTP requests within the NestJS ecosystem.
-   **`libs/offline-query-provider`**: Provides capabilities for handling data and queries in offline scenarios, likely integrating with TanStack Query.
-   **`libs/shared`**: A library for code, types, and utilities shared across different parts of the monorepo.
-   **`libs/ui-library`**: A collection of reusable UI components, developed and visualized with Storybook.

## CI/CD

The `ci/` directory contains configurations for:
-   **Jenkins (`ci/jenkins/`)**: For automating build, test, and deployment pipelines. See `ci/jenkins/Jenkinsfile`.
-   **SonarQube (`ci/sonar/`)**: For continuous inspection of code quality. See `ci/sonar/sonar-project.properties`.

---

For more details on configuration or troubleshooting, consult each service’s README under `apps/` or `libs/` folders if available, or their respective `project.json` files for Nx-specific tasks.
