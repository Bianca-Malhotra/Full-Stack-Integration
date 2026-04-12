import { apiRequest } from "./httpClient";

export const updateLocation = (payload) =>
  apiRequest("/location/update", {
    method: "POST",
    body: JSON.stringify(payload),
  });
