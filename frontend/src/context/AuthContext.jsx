import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiLogin } from '../services/api';

const AuthContext = createContext(null);

const SESSION_KEY = 'sbtk_session';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const session = JSON.parse(stored);
        if (Date.now() - session.lastActive < SESSION_TIMEOUT) {
          setUser(session);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const refreshSession = useCallback(() => {
    if (user) {
      const updated = { ...user, lastActive: Date.now() };
      setUser(updated);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    }
  }, [user]);

  // Auto-refresh session on activity
  useEffect(() => {
    if (!user) return;
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handler = () => refreshSession();
    events.forEach(e => window.addEventListener(e, handler, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, handler));
  }, [user, refreshSession]);

  // Check session timeout periodically
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        if (Date.now() - session.lastActive >= SESSION_TIMEOUT) {
          logout();
        }
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const login = async (username, password) => {
    const result = await apiLogin(username, password);
    if (result.success) {
      const session = {
        token: result.token,
        nama: result.nama,
        username,
        lastActive: Date.now(),
      };
      setUser(session);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
