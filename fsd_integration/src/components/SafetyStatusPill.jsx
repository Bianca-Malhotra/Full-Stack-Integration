import React from "react";

const styles = {
  SAFE: "status-safe",
  CAUTION: "status-caution",
  RISK: "status-danger",
};

const SafetyStatusPill = ({ status = "SAFE" }) => {
  const icon = status === "SAFE" ? "🛡️" : status === "CAUTION" ? "⚠️" : "🚨";
  
  return (
    <span className={`status-pill ${styles[status] || styles.SAFE}`}>
      {icon} {status}
    </span>
  );
};

export default SafetyStatusPill;
