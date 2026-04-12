import React from "react";

const RiskBadge = ({ level }) => {
  const normalized = (level || "LOW").toUpperCase();
  return <span className={`risk-badge risk-${normalized.toLowerCase()}`}>{normalized}</span>;
};

export default RiskBadge;
