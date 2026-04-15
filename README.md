# The Intelligence Ledger — Frontend

This is the React frontend for **The Intelligence Ledger** — a CV Scanning & JD Matching platform.

## Overview
This application provides two distinct workflows based on user roles:
- **Admin / HR**: Upload Job Descriptions (JDs), manage job campaigns, and view candidate matching analytics.
- **Employee / Candidate**: Upload their CV and view instantaneous AI-driven match results against available jobs.

## Tech Stack
- **React 18**
- **React Router v6**
- **Tailwind CSS v3** (with custom color tokens and typography)
- **Axios**

---

## 🛠 Testing the UI (Dev Mode)

The application is currently configured in **Dev Mode** (`DEV_MODE = true` in `AuthContext.js`). This mocks the backend authentication API, allowing you to easily test the UI for both roles without needing a running backend.

### How to test:
1. Start the development server (`npm start`).
2. Navigate to [http://localhost:3000/login](http://localhost:3000/login).
3. Use one of the following mock accounts to sign in:

#### 🧑‍💼 Test Account 1: Employee
- **Email:** `employee@company.com`
- **Password:** `password`
- **What you'll see:** The navigation will restrict you to `Overview`, `Job List`, `CV Upload`, and `Matching`.

#### 👔 Test Account 2: Admin / HR
- **Email:** `admin@company.com`
- **Password:** `password`
- **What you'll see:** The navigation will restrict you to `Overview`, `Job List`, `JD Upload`, and `Matching`.

---

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
