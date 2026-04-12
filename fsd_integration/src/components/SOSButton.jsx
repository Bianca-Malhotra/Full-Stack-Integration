import React, { useState } from "react";
import { triggerSos } from "../api/alertApi";

const SOSButton = ({ latitude, longitude, onSuccess }) => {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSos = async () => {
    const ok = window.confirm("Send SOS alert to emergency system?");
    if (!ok) return;

    setSending(true);
    setStatus("");
    try {
      await triggerSos({
        message: "Immediate help needed.",
        latitude,
        longitude,
      });
      setStatus("SOS sent successfully.");
      if (onSuccess) onSuccess();
    } catch (error) {
      setStatus("Failed to send SOS.");
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sos-wrapper">
      <button className="sos-button" disabled={sending} onClick={handleSos}>
        {sending ? "Sending..." : "SOS"}
      </button>
      {status && <p className="status-text">{status}</p>}
    </div>
  );
};

export default SOSButton;
