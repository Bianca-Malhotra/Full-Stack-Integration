import React, { useState } from "react";
import { getRouteSuggestion } from "../services/api";
import SafetyStatusPill from "./SafetyStatusPill";

const PLACES = [
  { name: "BrewNest Cafe", type: "Cafe", distanceKm: 0.9, safety: "SAFE" },
  { name: "Skyline Food Court", type: "Hangout", distanceKm: 1.4, safety: "CAUTION" },
  { name: "Green Park Plaza", type: "Hangout", distanceKm: 2.1, safety: "SAFE" },
];

const PlanSomethingPanel = ({ coords }) => {
  const [routeInfo, setRouteInfo] = useState(null);

  const loadRoute = async (place) => {
    try {
      const result = await getRouteSuggestion(coords.lat, coords.lng, coords.lat + 0.01, coords.lng + 0.01);
      setRouteInfo({ place, ...result });
    } catch {
      setRouteInfo(null);
    }
  };

  return (
    <div className="glass-card fade-in" style={{ borderColor: 'rgba(249, 115, 22, 0.3)' }}>
      <h3 className="heading-2">Plan Something Quick</h3>
      <p className="text-sub mb-4" style={{ marginBottom: '1.5rem' }}>Find safe places nearby and check for secure routes before leaving.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {PLACES.map((place) => (
          <div key={place.name} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', padding: '1rem', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{place.name}</p>
                <p className="text-sub" style={{ fontSize: '0.85rem' }}>{place.type} · <span style={{ color: 'var(--primary)' }}>{place.distanceKm} km</span></p>
              </div>
              <SafetyStatusPill status={place.safety} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => loadRoute(place)}>Verify Route Route</button>
              <a className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', textDecoration: 'none' }} href={`https://maps.google.com/?q=${encodeURIComponent(place.name)}`} target="_blank" rel="noreferrer">Maps</a>
              <a className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', textDecoration: 'none' }} href="https://m.uber.com" target="_blank" rel="noreferrer">Cab</a>
            </div>
          </div>
        ))}
      </div>

      {routeInfo?.safeRoute && (
        <div className="slide-up" style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '1rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--success)', marginBottom: '0.5rem' }}>Safer Option Available for {routeInfo.place.name} ✅</p>
          <p style={{ fontSize: '0.95rem' }}>{routeInfo.safeRoute.reason}</p>
          <p className="text-sub" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>ETA: {routeInfo.safeRoute.etaMinutes} min · Live Risk Score: {routeInfo.safeRoute.riskScore}</p>
        </div>
      )}
    </div>
  );
};

export default PlanSomethingPanel;
