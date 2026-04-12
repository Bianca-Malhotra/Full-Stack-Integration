import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LiveMonitoringPage = () => {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "/api/public/live/" + userId;

  const fetchTelemetry = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError("Unable to establish link with User Telemetry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000); // 10s sync
    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📡</div>
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>Establishing Secure Link...</p>
      </div>
    </div>
  );

  if (error) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }} className="glass-card">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <h2 className="heading-2">Link Failure</h2>
        <p className="text-sub">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary" style={{ marginTop: '2rem', padding: '0.75rem 2rem' }}>Retry Link</button>
      </div>
    </div>
  );

  const getStatusColor = () => {
    if (data.status === "RISK") return "var(--danger)";
    if (data.status === "CAUTION") return "#f59e0b"; // Amber 500
    return "var(--success)";
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '2rem' }}>
      <div className="layout-container slide-up" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header - Brand Only (No Nav) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>S</div>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.02em', fontFamily: "'Playfair Display', serif" }}>SafeRoute</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Monitoring Feed</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', borderTop: `10px solid ${getStatusColor()}` }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '1.5rem 4rem', 
              borderRadius: '100px', 
              background: getStatusColor(), 
              color: 'white', 
              fontWeight: 900, 
              fontSize: '2.5rem',
              boxShadow: `0 20px 40px ${getStatusColor()}33`
            }}>
              {data.status}
            </div>
          </div>
          
          <h1 className="heading-1" style={{ fontSize: '3rem', marginBottom: '1rem' }}>User Safety Telemetry</h1>
          <p className="text-sub" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
             {data.details}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
            <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)' }}>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Risk Score</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 900 }}>{data.riskScore}</p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)' }}>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>Last Update</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>{new Date(data.lastSeen).toLocaleTimeString()}</p>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', borderRadius: '12px', background: 'var(--primary-soft)', border: '1px solid var(--border-light)' }}>
             <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>Need to take action?</p>
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <a href="tel:100" className="btn-primary" style={{ padding: '1rem 2rem', textDecoration: 'none', borderRadius: '50px' }}>Call Authorities</a>
                <button className="btn-outline" style={{ padding: '1rem 2rem', borderRadius: '50px' }}>Broadcast Distress</button>
             </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          This link is a restricted, view-only monitoring channel provided by SafeRoute. Privacy is our priority.
        </p>
      </div>
    </div>
  );
};

export default LiveMonitoringPage;
