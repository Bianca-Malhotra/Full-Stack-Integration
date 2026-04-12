import { apiRequest } from "./httpClient";

export const getContacts = () => apiRequest("/contacts");

export const addContact = (payload) =>
  apiRequest("/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateContact = (id, payload) =>
  apiRequest(`/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteContact = (id) =>
  apiRequest(`/contacts/${id}`, {
    method: "DELETE",
  });
