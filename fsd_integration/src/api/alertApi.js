import { apiRequest } from "./httpClient";

export const getAlerts = () => apiRequest("/alerts");

export const triggerSos = ({ message, latitude, longitude }) =>
  apiRequest("/sos", {
    method: "POST",
    body: JSON.stringify({ message, latitude, longitude }),
  });
