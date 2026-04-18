# Campus Pulse: Extracurricular Ecosystem 🚀

**Batch**: 2029 | **Course**: Building Web Applications with React | **End-Term Project**

---

## 🎯 Problem Statement
In many college campuses, information about extracurricular activities, club applications, and house competitions is scattered across various WhatsApp groups and notice boards. This lack of centralization causes students to miss deadlines, feel disconnected from house standings, and leads to low participation in college events.

**Campus Pulse** solves this by providing a centralized, real-time "Pulse" of the college. It integrates application registrations, live event tracking, and a gamified house leaderboard into a single, premium dashboard.

---

## ✨ Core Features

### 1. 📋 Unified Application Portal
*   Integrated registration system for all club activities.
*   Real-time deadline tracking.
*   Direct redirection to application forms.

### 2. 📡 Live Event Tracker
*   Three-tier event categorization: **Live**, **Upcoming**, and **Past**.
*   Real-time victory announcements with winner spotlight badges.
*   Detailed event info including location and host clubs.

### 3. 🏆 Gamified House Leaderboard
*   Dynamic house rankings with circular progress meters.
*   Relative progress tracking (calculated against the leading house).
*   **Drill-down Analytics**: Click any house to see their specific victory history across all campus activities.

### 4. 💬 Student Engagement
*   **Shoutouts**: A dedicated section to celebrate student achievements.
*   **Interactive Reactions**: Students can "React" to shoutouts, triggering real-time atomic updates in the Cloud Firestore database.
*   **Announcements**: Official college updates delivered in a clean, high-contrast interface.

---

## 🛠 Tech Stack
*   **Frontend**: React (Vite + TypeScript)
*   **Styling**: Vanilla CSS (Custom Glassmorphism Design System)
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Backend**: Firebase (Authentication + Cloud Firestore)
*   **Global State**: React Context API
*   **Optimization**: `useMemo`, `useCallback`, `React.lazy`, `Suspense`

---

## 🏗 Scalable Architecture
The project follows a modular structure for maintainability:
- `/src/context`: Global state management for User Auth.
- `/src/components`: Reusable UI components (MainDashboard, Card, etc.).
- `/src/pages`: Optimized pages using code-splitting.
- `/src/services`: Centralized Firebase configuration and logic.
- `/src/types`: Centralized TypeScript interfaces for data consistency.

---

## 🚀 Setup Instructions

1. **Clone the Repo**:
   ```bash
   git clone <your-repo-link>
   cd campus-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Firebase Configuration**:
   The project is pre-configured with the production Firebase SDK. Ensure you have the `firebase` package installed.

4. **Run Locally**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## ⚖️ Academic Integrity
This project was built as a custom solution to a real-world problem. Every React component, Firestore integration, and design token has been implemented with a focus on core engineering principles and performance optimization.
