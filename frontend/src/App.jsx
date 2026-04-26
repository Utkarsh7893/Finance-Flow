import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Sidebar from './components/Sidebar';
import Background3D from './components/Background3D';

import Savings from './pages/Savings';
import Borrowed from './pages/Borrowed';
import About from './pages/About';
import TermsView from './pages/TermsView';

// Wraps authenticated pages with sidebar + background
const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Background3D />
      <Sidebar />
      <div className="flex-1 w-full md:ml-64 pb-16 md:pb-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

// Protected route: requires auth
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useStore(state => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <AppLayout>{children}</AppLayout>;
};



export default function App() {
  const checkAuth = useStore(state => state.checkAuth);
  const isAuthenticated = useStore(state => state.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes — user always lands on login first */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/landing" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/terms-view" element={<TermsView />} />

        {/* Protected app routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
        <Route path="/borrowed" element={<ProtectedRoute><Borrowed /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
