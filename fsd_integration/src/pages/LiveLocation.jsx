import React, { useEffect, useState } from "react";
import { updateLocation } from "../api/locationApi";
import RiskBadge from "../components/RiskBadge";
import SOSButton from "../components/SOSButton";

const LiveLocation = () => {
  const [coords, setCoords] = useState({ latitude: 30.7333, longitude: 76.7794 });
  const [nearbyUsers, setNearbyUsers] = useState(2);
  const [crimeRate, setCrimeRate] = useState(3.2);
  const [lastRisk, setLastRisk] = useState({ riskScore: 0, riskLevel: "LOW" });
  const [status, setStatus] = useState("");

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const pushLocation = async () => {
    try {
      const result = await updateLocation({
        latitude: Number(coords.latitude),
        longitude: Number(coords.longitude),
        crimeRate: Number(crimeRate),
        nearbyUsers: Number(nearbyUsers),
      });
      setLastRisk({
        riskScore: result.riskScore,
        riskLevel: result.riskLevel,
      });
      setStatus("Live location updated.");
    } catch (error) {
      setStatus("Failed to update location.");
      console.error(error);
    }
  };

  return (
    <section className="page">
      <h2 className="page-title">Live Location</h2>
      <div className="card">
        <div className="location-grid">
          <input
            className="input"
            type="number"
            step="0.000001"
            value={coords.latitude}
            onChange={(e) => setCoords((p) => ({ ...p, latitude: e.target.value }))}
            placeholder="Latitude"
          />
          <input
            className="input"
            type="number"
            step="0.000001"
            value={coords.longitude}
            onChange={(e) => setCoords((p) => ({ ...p, longitude: e.target.value }))}
            placeholder="Longitude"
          />
          <input
            className="input"
            type="number"
            value={crimeRate}
            onChange={(e) => setCrimeRate(e.target.value)}
            placeholder="Crime rate"
          />
          <input
            className="input"
            type="number"
            value={nearbyUsers}
            onChange={(e) => setNearbyUsers(e.target.value)}
            placeholder="Nearby users"
          />
        </div>
        <div className="action-row">
          <button className="button button-primary" onClick={detectLocation}>
            Detect Location
          </button>
          <button className="button button-primary" onClick={pushLocation}>
            Update Location
          </button>
        </div>
        <div className="risk-row">
          <p>
            Last Risk Score: <strong>{Number(lastRisk.riskScore || 0).toFixed(2)}</strong>
          </p>
          <RiskBadge level={lastRisk.riskLevel} />
        </div>
        {status && <p className="status-text">{status}</p>}
      </div>

      <SOSButton latitude={coords.latitude} longitude={coords.longitude} onSuccess={pushLocation} />
    </section>
  );
};

export default LiveLocation;
