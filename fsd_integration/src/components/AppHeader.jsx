import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

const AppHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <header className="app-header glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-light)' }}>
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1800px', margin: '0 auto', padding: '1rem 3rem' }}>
        <div className="brand" onClick={() => navigate("/")} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(14, 165, 233, 0.2)' }}>S</div>
          <div>
            <span className="brand-name" style={{ 
              fontSize: '2.2rem', 
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, 
              background: 'linear-gradient(to right, var(--primary), #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>SafeRoute</span>
            <span className="brand-tag" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>Operational Security Platform</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="btn-outline" style={{ padding: '0.6rem 1rem', fontSize: '1.2rem', borderRadius: '50px', width: '45px' }}>
            {isDark ? "🔆" : "🌙"}
          </button>
          <button onClick={() => navigate("/")} className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '50px' }}>Intelligence Hub</button>
          <button onClick={() => navigate("/dashboard")} className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '50px' }}>Operational Dashboard</button>
          <button onClick={() => navigate("/contacts")} className="btn-outline" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '50px' }}>Security Network</button>
          <button onClick={logout} className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', borderRadius: '50px' }}>Secure Logout</button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
