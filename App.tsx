import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Games } from './components/Games';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { User } from './types';
import { api } from './lib/api';

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthOpen(true);
  };

  const openRegister = () => {
    setAuthMode('register');
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.scrollTo(0, 0);
  };

  const handleUpdateUser = async (updatedUser: User) => {
    try {
      // Optimistic UI update
      setCurrentUser(updatedUser);
      // API call
      const serverUser = await api.users.update(updatedUser);
      setCurrentUser(serverUser);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f141a] text-white font-sans selection:bg-purple-500 selection:text-white">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <main>
        {isLoggedIn && currentUser ? (
          <Dashboard currentUser={currentUser} onUpdateUser={handleUpdateUser} />
        ) : (
          <>
            <Hero onLogin={openLogin} onRegister={openRegister} />
            <Games />
            <HowItWorks />
            <About />
          </>
        )}
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;