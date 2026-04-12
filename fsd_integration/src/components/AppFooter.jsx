import React from "react";

const AppFooter = () => {
  return (
    <footer className="glass-panel" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-light)', background: 'var(--bg-surface)', padding: '4rem 0' }}>
      <div className="layout-container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '4rem' }}>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>S</div>
            <span style={{ 
              fontSize: '1.5rem', 
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900, 
              color: 'var(--text-main)',
              letterSpacing: '-0.02em' 
            }}>SafeRoute</span>
          </div>
          <p className="text-sub" style={{ fontSize: '0.95rem', maxWidth: '350px' }}>
            Empowering individuals with real-time risk assessment, stealth emergency protocols, and intelligence-led safety telemetry.
          </p>
        </div>

        <div>
          <h4 style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Core Protocols</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li>Stealth SOS Broadcasting</li>
            <li>Tactical Safe-Zone Routing</li>
            <li>Arrival Confirmation Systems</li>
            <li>Intelligence Feed Syncing</li>
          </ul>
        </div>

        <div>
           <h4 style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Developer</h4>
           <p className="text-sub" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Developed by <strong>Bianca Malhotra</strong></p>
           <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/Bianca-Malhotra" target="_blank" rel="noreferrer" className="text-sub" style={{ fontSize: '0.85rem', textDecoration: 'none' }}>GitHub</a>
              <a href="https://www.linkedin.com/in/bianca-malhotra/" target="_blank" rel="noreferrer" className="text-sub" style={{ fontSize: '0.85rem', textDecoration: 'none' }}>LinkedIn</a>
           </div>
        </div>

      </div>
      
      <div className="layout-container" style={{ paddingTop: '3rem', marginTop: '3rem', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 SafeRoute Operational Security Platform. All telemetry is encrypted and private.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
