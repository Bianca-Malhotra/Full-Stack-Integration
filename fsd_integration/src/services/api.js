import axios from "axios";

const BASE_URL = "/api";
const TOKEN_KEY = "token";
const USER_KEY = "user";

const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const login = async (username, password) => {
  const { data } = await client.post("/auth/login", { username, password });
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  }
  return data;
};

export const register = async (username, password) => {
  const { data } = await client.post("/auth/register", { username, password });
  return data;
};

export const loginWithGoogle = async (idToken) => {
  const { data } = await client.post("/auth/google", { idToken });
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data));
  }
  return data;
};

export const getSafetyStatus = async () => (await client.get("/safety-status")).data;
export const updateLocation = async (lat, lng) => (await client.post("/location/update", { lat, lng })).data;
export const stealthSos = async (lat, lng, continuousTracking = false) =>
  (await client.post("/sos/stealth", { lat, lng, continuousTracking })).data;
export const startJourney = async (payload) => (await client.post("/journey/start", payload)).data;
export const shareJourneyLocation = async (lat, lng) =>
  (await client.post("/journey/share-location", { lat, lng })).data;
export const startCheckIn = async (minutes) => (await client.post("/checkin/start", { minutes })).data;
export const confirmCheckIn = async () => (await client.post("/checkin/confirm")).data;
export const getRouteSuggestion = async (startLat, startLng, endLat, endLng) =>
  (await client.get("/route/suggestion", { params: { startLat, startLng, endLat, endLng } })).data;

export const getContacts = async () => (await client.get("/contacts")).data;
export const createContact = async (payload) => (await client.post("/contacts", payload)).data;
export const editContact = async (id, payload) => (await client.put(`/contacts/${id}`, payload)).data;
export const removeContact = async (id) => (await client.delete(`/contacts/${id}`)).data;
