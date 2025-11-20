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

// Mock Database - Fake Users
const MOCK_USERS: User[] = [
  { id: 1, username: 'DemoUser', email: 'demo@cafe.com', points: 1250 },
  { id: 2, username: 'Admin', email: 'admin@cafe.com', points: 9999 }
];

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

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

  const handleRegisterUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.scrollTo(0, 0);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    // Update in mock db as well
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
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
        existingUsers={users}
        onRegister={handleRegisterUser}
      />
    </div>
  );
};

export default App;