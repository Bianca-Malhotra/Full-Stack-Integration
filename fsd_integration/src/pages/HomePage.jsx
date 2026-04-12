import React, { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import GetMeOutPanel from "../components/GetMeOutPanel";
import PlanSomethingPanel from "../components/PlanSomethingPanel";
import SafetyStatusPill from "../components/SafetyStatusPill";
import { confirmCheckIn, getSafetyStatus, startCheckIn, updateLocation } from "../services/api";
import { useAuth } from "../services/auth";

const HomePage = () => {
  const [status, setStatus] = useState("SAFE");
  const [coords, setCoords] = useState({ lat: 30.7333, lng: 76.7794 });
  const [activeAction, setActiveAction] = useState(null);
  const [timerMinutes, setTimerMinutes] = useState(20);
  const [info, setInfo] = useState("");
  const [isTourActive, setIsTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [spotlight, setSpotlight] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const tourData = [
    {
      target: "tour-status",
      title: "Real-time Safety Status",
      content: "This indicator shows your current safety level based on your location and active monitoring.",
    },
    {
      target: "tour-out",
      title: "Emergency Escape",
      content: "The 'Get Me Out' card provides instant access to escape routes and fake calls when you feel unsafe.",
    },
    {
      target: "tour-plan",
      title: "Secure Route Planning",
      content: "Plan your travel ahead of time by finding verified safe zones and well-lit paths.",
    },
    {
      target: "tour-timer",
      title: "Peace of Mind Timer",
      content: "Set a check-in timer when heading somewhere risky. We'll alert your contacts if you don't confirm arrival.",
    }
  ];

  const updateSpotlight = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      setSpotlight({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
      
      // Scroll to element if not in view
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (isTourActive) {
      updateSpotlight(tourData[tourStep].target);
    }
  }, [isTourActive, tourStep]);

  const handleNextTour = () => {
    if (tourStep < tourData.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setIsTourActive(false);
      setTourStep(0);
    }
  };

  useEffect(() => {
    const resolveLocation = () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    };
    resolveLocation();
  }, []);

  useEffect(() => {
    const sync = async () => {
      try {
        await updateLocation(coords.lat, coords.lng);
        const s = await getSafetyStatus();
        setStatus(s.status || "SAFE");
      } catch {
        setStatus("CAUTION");
      }
    };
    sync();
  }, [coords.lat, coords.lng]);

  const handleStartTimer = async () => {
    try {
      await startCheckIn(Number(timerMinutes));
      setInfo(`Check-in timer set for ${timerMinutes} min.`);
    } catch {
      setInfo("Could not start timer.");
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmCheckIn();
      setInfo("Check-in confirmed. Safe arrival.");
      setTimeout(() => setInfo(""), 3000);
    } catch {
      setInfo("No active timer to confirm.");
      setTimeout(() => setInfo(""), 3000);
    }
  };

  const { user } = useAuth();

  const handleShareIntelligence = async () => {
    const liveLink = window.location.origin + "/monitor/" + user.id;
    const shareData = {
      title: 'SafeRoute Intelligence Feed',
      text: 'Monitoring Alert! I am sharing my live security feed with you via SafeRoute. View my status here:',
      url: liveLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share aborted");
      }
    } else {
      navigator.clipboard.writeText(liveLink);
      setInfo("Intelligence link copied to clipboard.");
      setTimeout(() => setInfo(""), 3000);
    }
  };

  return (
    <>
      <AppHeader />
      <main className="layout-container" style={{ paddingTop: '1.5rem' }}>
        
        {/* Dashboard Title - Wide Header */}
        <div className="fade-in" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 className="heading-1" style={{ marginBottom: '0.25rem' }}>Security Operations</h1>
            <p className="text-sub">Global monitoring active. All internal systems operational.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em' }}>Server Status</p>
            <p style={{ fontWeight: 600 }}>Connected · 26ms Latency</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr 400px', gap: '4rem', alignItems: 'start' }}>
          
          {/* COLUMN 1: Rapid Response Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <h2 className="heading-2" style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 800 }}>Tactical Response</h2>
            
            <div 
              id="tour-out"
              className="action-card" 
              onClick={() => setActiveAction(activeAction === "out" ? null : "out")}
              style={{ borderTop: activeAction === "out" ? '10px solid var(--danger)' : '1px solid var(--border-light)', padding: '3.5rem' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>🚨</div>
              <h3 className="heading-2" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Emergency Escape</h3>
              <p className="text-sub" style={{ fontSize: '1.05rem' }}>Deploy instant escape routes, spoofing protocols, and live distress broadcasting.</p>
            </div>

            <div 
              id="tour-plan"
              className="action-card"
              onClick={() => setActiveAction(activeAction === "plan" ? null : "plan")}
              style={{ borderTop: activeAction === "plan" ? '10px solid var(--primary)' : '1px solid var(--border-light)', padding: '3.5rem' }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>🛡️</div>
              <h3 className="heading-2" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Secure Navigation</h3>
              <p className="text-sub" style={{ fontSize: '1.05rem' }}>Utilize verified safe-havens and intelligence-led route assessments.</p>
            </div>
          </div>

          {/* COLUMN 2: Operations Center (Fluid Centerpiece) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
             <h2 className="heading-2" style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 800 }}>Operational Feed</h2>
             
             {/* Security Overview */}
             <section id="tour-status" className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2.5rem 4rem' }}>
                <div>
                  <h2 className="heading-2" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Encryption Active</h2>
                  <p className="text-sub" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>End-to-end secure location synchronization is currently broadcasting.</p>
                  <button onClick={handleShareIntelligence} className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem', borderRadius: '50px' }}>
                    🔗 Share Intelligence Feed
                  </button>
                </div>
                <SafetyStatusPill status={status} />
             </section>

             {/* Dynamic Interaction Area */}
             <div style={{ minHeight: '500px' }}>
                {!activeAction && (
                  <div className="glass-card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', textAlign: 'center', border: '1px dashed var(--border-light)' }}>
                     <div style={{ fontSize: '4rem', opacity: 0.1, marginBottom: '2rem' }}>📡</div>
                     <h3 className="heading-2" style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Monitoring Standby</h3>
                     <p className="text-sub" style={{ maxWidth: '400px', fontSize: '1.1rem' }}>Initiate a tactical operation from the left console to analyze live telemetry.</p>
                  </div>
                )}
                {activeAction === "out" && <div className="slide-up"><GetMeOutPanel coords={coords} /></div>}
                {activeAction === "plan" && <div className="slide-up"><PlanSomethingPanel coords={coords} /></div>}
             </div>
          </div>

          {/* COLUMN 3: Protocols Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <h2 className="heading-2" style={{ fontSize: '1rem', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 800 }}>Active Protocols</h2>
            
            {/* Check-in Timer */}
            <section id="tour-timer" className="glass-card" style={{ padding: '3rem', borderLeft: '10px solid var(--success)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 15px var(--success)' }}></div>
                <h3 className="heading-2" style={{ marginBottom: 0, fontSize: '1.4rem' }}>Arrival Protocol</h3>
              </div>
              <p className="text-sub" style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                Authorize contacts to receive emergency telemetry if arrival is not manually confirmed.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem' }}>Time Horizon (MIN)</label>
                  <input
                    type="number"
                    min="1"
                    value={timerMinutes}
                    onChange={(e) => setTimerMinutes(e.target.value)}
                    className="input-field"
                    placeholder="20"
                  />
                </div>
                <button onClick={handleStartTimer} className="btn-primary" style={{ width: '100%', borderRadius: '12px', padding: '1.25rem' }}>
                  Initialize Protocol
                </button>
                <button onClick={handleConfirm} className="btn-outline" style={{ width: '100%', padding: '1.25rem', borderRadius: '12px', fontWeight: 700 }}>
                  Confirm Secure Arrival
                </button>
              </div>
              
              {info && (
                <div className="fade-in" style={{ marginTop: '1.5rem', padding: '1rem', fontSize: '0.85rem', borderRadius: '8px', background: 'var(--primary-soft)', color: 'var(--primary)', fontWeight: 700, textAlign: 'center' }}>
                   {info}
                </div>
              )}

              <button onClick={() => setIsTourActive(true)} className="btn-outline" style={{ width: '100%', marginTop: '2rem', padding: '0.6rem', fontSize: '0.8rem', border: 'none', background: '#f1f5f9', color: 'var(--text-muted)', fontWeight: 600 }}>
                 ⚙️ Assistance Protocol
              </button>
            </section>
          </div>

        </div>
      </main>

      {/* Tour Overlay Components */}
      {isTourActive && (
        <>
          <div className="tour-overlay" onClick={() => setIsTourActive(false)}></div>
          <div className="tour-spotlight" style={{
            top: spotlight.top - 10,
            left: spotlight.left - 10,
            width: spotlight.width + 20,
            height: spotlight.height + 20
          }}></div>
          <div className="tour-tooltip" style={{
            top: spotlight.top + spotlight.height + 25,
            left: Math.min(window.innerWidth - 350, Math.max(20, spotlight.left + spotlight.width/2 - 160))
          }}>
            <button className="tour-close" onClick={() => setIsTourActive(false)}>×</button>
            <h4>{tourData[tourStep].title}</h4>
            <p>{tourData[tourStep].content}</p>
            <div className="tour-controls">
              <span className="tour-progress">Step {tourStep + 1} of {tourData.length}</span>
              <button className="btn-tour-next" onClick={handleNextTour}>
                {tourStep === tourData.length - 1 ? "Finish" : "Next →"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
