import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth";

const AppHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="app-header glass-panel" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #eef2f6' }}>
      <div className="header-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1440px', margin: '0 auto', padding: '1rem 3rem' }}>
        <div className="brand" onClick={() => navigate("/")} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: '1.2rem' }}>S</div>
          <div>
            <span className="brand-name" style={{ fontSize: '1.5rem', fontWeight: 850, color: '#0f172a', letterSpacing: '-0.03em' }}>SafeRoute</span>
            <span className="brand-tag" style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '-2px' }}>Operational Security Platform</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
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
