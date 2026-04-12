import React, { useMemo, useState } from "react";
import { getContacts, shareJourneyLocation, startJourney, stealthSos } from "../services/api";
import FakeCallModal from "./FakeCallModal";
import { Car, Share2, Phone, ShieldAlert, CheckCircle, ChevronRight } from "lucide-react";

const SAFE_PLACES = [
  { name: "Central Cafe", type: "Cafe", distanceKm: 0.6 },
  { name: "City Hospital", type: "Hospital", distanceKm: 1.2 },
  { name: "Sector Police Station", type: "Police", distanceKm: 1.8 },
];

const GetMeOutPanel = ({ coords }) => {
  const [contacts, setContacts] = useState([]);
  const [fakeCallOpen, setFakeCallOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const [status, setStatus] = useState("");

  const contactIds = useMemo(() => contacts.slice(0, 2).map((c) => c.id), [contacts]);

  React.useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data || []);
      } catch {
        setContacts([]);
      }
    };
    loadContacts();
  }, []);

  const shareLiveLocation = async () => {
    try {
      await startJourney({
        destinationName: "Safe Place",
        destinationLat: coords.lat + 0.005,
        destinationLng: coords.lng + 0.005,
        contactIds,
      });
      await shareJourneyLocation(coords.lat, coords.lng);
      setStatus("Live location shared with selected contacts.");
      setTimeout(() => setStatus(""), 4000);
    } catch {
      setStatus("Failed to share location.");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  const sendStealthSos = async () => {
    try {
      await stealthSos(coords.lat, coords.lng, true);
      setStatus("Stealth SOS sent silently.");
      setTimeout(() => setStatus(""), 4000);
    } catch {
      setStatus("Stealth SOS failed.");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <div className="glass-card fade-in" style={{ borderTop: '4px solid var(--danger)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="heading-2" style={{ margin: 0 }}>Emergency Options</h3>
        <ShieldAlert color="var(--danger)" size={24} />
      </div>
      
      <div className="emergency-btn-grid">
        <a
          href="https://m.uber.com"
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
          style={{ textAlign: 'center', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem' }}
        >
          <Car size={20} />
          <span style={{ fontSize: '0.85rem' }}>Book Ride</span>
        </a>
        <button onClick={shareLiveLocation} className="btn-outline" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem' }}>
          <Share2 size={20} />
          <span style={{ fontSize: '0.85rem' }}>Share Location</span>
        </button>
        <button onClick={() => setFakeCallOpen(true)} className="btn-outline" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '1rem' }}>
          <Phone size={20} />
          <span style={{ fontSize: '0.85rem' }}>Fake Call</span>
        </button>
        <button onClick={sendStealthSos} className="sos-glow-button">
          <ShieldAlert size={24} />
          <span style={{ fontSize: '0.9rem' }}>STEALTH SOS</span>
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <p style={{ fontWeight: 600, fontSize: '1rem' }}>Nearby Safe Places</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LIVE UPDATES</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {SAFE_PLACES.map((p) => (
            <div key={p.name} className="list-item-refined">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '1rem', margin: 0 }}>{p.name}</p>
                  <p className="text-sub" style={{ fontSize: '0.8rem', margin: 0 }}>{p.type}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.distanceKm} km</span>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '1.25rem', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
           <p style={{ fontWeight: 600, margin: 0 }}>Fake Call Preview</p>
           <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input type="checkbox" checked={audioOn} onChange={(e) => setAudioOn(e.target.checked)} style={{ accentColor: 'var(--primary)' }} />
            <span className="text-sub">Play Audio</span>
          </label>
        </div>

        <div className="phone-preview">
          <div className="phone-preview-glow"></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--bg-surface), #2d3748)', margin: '0 auto 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.05)' }}>
              <Phone size={32} color="var(--primary)" fill="var(--primary)" style={{ opacity: 0.8 }} />
            </div>
            <p style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.15rem', letterSpacing: '-0.02em' }}>Mom</p>
            <p className="text-sub" style={{ fontSize: '0.95rem', marginBottom: '2.5rem', fontWeight: 500, color: 'var(--primary)', opacity: 0.8 }}>Incoming WhatsApp Video...</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '0 1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <button className="call-btn call-btn-decline">
                  <Phone size={24} style={{ transform: 'rotate(135deg)' }} fill="white" />
                </button>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ff4b2b' }}>Decline</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <button className="call-btn call-btn-answer" onClick={() => setFakeCallOpen(true)}>
                  <Phone size={24} fill="white" />
                </button>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38ef7d' }}>Answer</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sub" style={{ fontSize: '0.85rem', textAlign: 'center', marginTop: '1rem' }}>
          Use this to exit uncomfortable situations safely and quickly.
        </p>
      </div>
      
      {status && (
        <div className="fade-in" style={{ 
          marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid var(--success)', borderRadius: '0.75rem', color: 'var(--success)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <CheckCircle size={16} />
          <span style={{ fontSize: '0.9rem' }}>{status}</span>
        </div>
      )}
      <FakeCallModal open={fakeCallOpen} onClose={() => setFakeCallOpen(false)} playAudio={audioOn} />
    </div>
  );
};

export default GetMeOutPanel;
