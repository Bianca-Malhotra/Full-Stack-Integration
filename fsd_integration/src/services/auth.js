import React, { createContext, useContext, useMemo, useState } from "react";
import { clearSession, getStoredUser, login as loginApi, register as registerApi, loginWithGoogle as loginGoogleApi } from "./api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());

  const login = async (username, password) => {
    const data = await loginApi(username, password);
    setUser(data);
    return data;
  };

  const loginWithGoogle = async (idToken) => {
    const data = await loginGoogleApi(idToken);
    setUser(data);
    return data;
  };

  const register = async (username, password) => {
    return await registerApi(username, password);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, loginWithGoogle, register, logout }), [user]);
  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => useContext(AuthContext);
