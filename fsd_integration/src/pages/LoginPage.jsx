import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/auth";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const { user, login, register, loginWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (user) return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (!username || !password) {
        setError("Email and Password are required");
        return;
      }
      
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password);
        setSuccess("Account created successfully! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? "Invalid credentials" : "Registration failed"));
    }
  };

  const onGoogleSuccess = async (credentialResponse) => {
    try {
      setError("");
      await loginWithGoogle(credentialResponse.credential);
    } catch (err) {
      setError("Google Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative', overflow: 'hidden' }}>
      <div 
        className="fade-in"
        style={{
          position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px',
          background: 'rgba(249, 115, 22, 0.4)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0
        }}
      />
      <div 
        className="fade-in"
        style={{
          position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px',
          background: 'rgba(236, 72, 153, 0.4)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0
        }}
      />
      
      <form
        onSubmit={onSubmit}
        className="glass-card slide-up"
        style={{ width: '100%', maxWidth: '420px', padding: '2.5rem 2rem', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛡️</div>
          <h1 className="heading-1" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>SafeRoute</h1>
          <p className="text-sub">Intelligent Personal Safety</p>
          <p className="text-sub" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
            {isLogin ? "Sign in to continue" : "Create a new account"}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div className="fade-in" style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '0.5rem', color: 'var(--danger)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {success && (
          <div className="fade-in" style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '0.5rem', color: 'var(--success)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {success}
          </div>
        )}

        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          {isLogin ? "Log In Securely" : "Create Account"}
        </button>

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span style={{ fontSize: '0.85rem' }}>or continue with</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          <div style={{ display: 'flex', marginTop: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ overflow: 'hidden', borderRadius: '0.5rem' }}>
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={() => setError("Google Sign In was unsuccessful")}
                useOneTap
                theme="filled_black"
                shape="circle"
              />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.0rem' }}>
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
