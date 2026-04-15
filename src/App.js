import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import Login from './pages/Login';
import Register from './pages/Register';
import JobList from './pages/JobList';
import UploadJD from './pages/UploadJD';
import UploadCV from './pages/UploadCV';
import Matching from './pages/Matching';
import './App.css';

const PrivateRoute = ({ children, adminOnly = false, employeeOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-primary text-5xl animate-spin">progress_activity</span>
          <p className="text-on-surface-variant font-body text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (employeeOnly && isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppLayout = ({ children, showNavFooter = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showNavFooter && <NavBar />}
      <main className="flex-1">{children}</main>
      {showNavFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without nav/footer */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected route with nav/footer */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppLayout>
                <Overview />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Shared route — both roles */}
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <AppLayout>
                <JobList />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Admin/HR only — JD Upload */}
        <Route
          path="/jobs/upload"
          element={
            <PrivateRoute adminOnly>
              <AppLayout>
                <UploadJD />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Employee only — CV Upload */}
        <Route
          path="/cv"
          element={
            <PrivateRoute employeeOnly>
              <AppLayout>
                <UploadCV />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Shared route — Matching analytics */}
        <Route
          path="/matching"
          element={
            <PrivateRoute>
              <AppLayout>
                <Matching />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
