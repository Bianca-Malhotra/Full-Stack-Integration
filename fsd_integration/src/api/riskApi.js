import { apiRequest } from "./httpClient";

export const getRiskScore = () => apiRequest("/risk-score");
