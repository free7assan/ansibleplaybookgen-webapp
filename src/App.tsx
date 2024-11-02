import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { useAuth } from './hooks/useAuth';
import { AuthModal } from './components/AuthModal';
import { PlaybookProvider } from './context/PlaybookContext';

export default function App() {
  const { 
    isAuthenticated, 
    showAuthModal, 
    setShowAuthModal,
    user,
    error,
    handleAuth,
    logout
  } = useAuth();

  return (
    <PlaybookProvider>
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <LandingPage onSignIn={() => setShowAuthModal(true)} />
            } 
          />
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? 
                <Dashboard user={user} onLogout={logout} /> : 
                <Navigate to="/" replace />
            } 
          />
        </Routes>

        <AuthModal 
          show={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
          error={error}
        />
      </BrowserRouter>
    </PlaybookProvider>
  );
}