import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./services/auth";

// Lazy-Loaded Tactical Modules
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));

// Premium 'Operational' Loading Fallback
const OperationalFallback = () => (
  <div style={{ height: '100vh', width: '100vw', background: '#f0f7ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div className="loader-ring" style={{ width: '60px', height: '60px', border: '5px solid #e0f2fe', borderTop: '5px solid #0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1.5rem' }}></div>
    <p style={{ fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem' }}>Initializing Secure Module...</p>
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

const Protected = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Suspense fallback={<OperationalFallback />}>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Protected>
            <InfoPage />
          </Protected>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <HomePage />
          </Protected>
        }
      />
      <Route
        path="/contacts"
        element={
          <Protected>
            <ContactsPage />
          </Protected>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;