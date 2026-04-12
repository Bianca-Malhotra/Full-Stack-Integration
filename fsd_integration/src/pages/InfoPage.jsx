import React from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

const InfoPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      
      <main className="layout-container slide-up" style={{ flex: 1, paddingTop: '3rem' }}>
        
        {/* HERO SECTION */}
        <section className="fade-in" style={{ textAlign: 'center', marginBottom: '6rem', padding: '4rem 0' }}>
          <h1 className="heading-1" style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>Intelligence Hub</h1>
          <p className="text-sub" style={{ fontSize: '1.4rem', maxWidth: '900px', margin: '0 auto' }}>
            The global headquarters for tactical personal security. SafeRoute integrates real-time telemetry 
            with advanced emergency protocols to keep you one step ahead in every environment.
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
             <button onClick={() => navigate("/dashboard")} className="btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>Get Started</button>
             <button onClick={() => navigate("/contacts")} className="btn-outline" style={{ padding: '1.25rem 3rem', fontSize: '1.1rem' }}>Security Network</button>
          </div>
        </section>

        {/* MIDDLE SECTION - FEATURES GRID */}
        <section style={{ marginBottom: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="heading-2" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Tactical Features</h2>
            <p className="text-sub">Engineered for precision. Built for safety.</p>
          </div>

          <div className="layout-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
            <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>📡</div>
              <h3 className="heading-2" style={{ fontSize: '1.75rem' }}>Global Telemetry</h3>
              <p className="text-sub">Real-time location synchronization across secure cloud architecture, ensuring your network always knows where you are.</p>
            </div>
            <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>🔏</div>
              <h3 className="heading-2" style={{ fontSize: '1.75rem' }}>Stealth SOS</h3>
              <p className="text-sub">Silently trigger emergency protocols with a single gesture. Encrypted alerts are dispatched to authorized endpoints instantly.</p>
            </div>
            <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>🛡️</div>
              <h3 className="heading-2" style={{ fontSize: '1.75rem' }}>Safe-Zone Analysis</h3>
              <p className="text-sub">Proprietary algorithms analyze your surroundings to identify verified safe-havens and intelligence-led routing.</p>
            </div>
            <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>⌛</div>
              <h3 className="heading-2" style={{ fontSize: '1.75rem' }}>Arrival Protocol</h3>
              <p className="text-sub">Automatic check-in monitoring that alerts your security network if you don't reach your destination within the time window.</p>
            </div>
          </div>
        </section>

        {/* ABOUT & DEVELOPER SECTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '6rem' }}>
          
          <section className="glass-card" style={{ padding: '4rem' }}>
            <h2 className="heading-2" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Operational Mission</h2>
            <p className="text-sub" style={{ fontSize: '1.1rem' }}>
              SafeRoute is a next-generation security platform designed to empower individuals with real-time risk assessment 
              and automated monitoring. Our mission is to transform your digital presence into a 
              powerful safety shield that connects you to help when every second counts.
            </p>
          </section>

          <section className="glass-card" style={{ padding: '4rem', borderBottom: '6px solid var(--primary)' }}>
            <h2 className="heading-2" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Developer Spotlight</h2>
            <p className="text-sub" style={{ marginBottom: '2rem' }}>Architected with passion for public safety and high-fidelity tactical design.</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div>
                <h3 className="heading-2" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Bianca Malhotra</h3>
                <p className="text-sub" style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 700 }}>Full Stack Security Architect</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <a href="https://github.com/Bianca-Malhotra" target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>GitHub</a>
                  <a href="https://www.linkedin.com/in/bianca-malhotra/" target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>LinkedIn</a>
                </div>
              </div>
            </div>
          </section>

        </div>

      </main>

      <AppFooter />
    </div>
  );
};

export default InfoPage;
