import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopSection from './section/TopSection.jsx';
import MusicSection from './section/MusicSection.jsx';
import Favorite from './pages/FavoritePages.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AccountPage from './pages/Account.jsx'; // Import the Account Page
import { FavoriteProvider } from './context/FavoriteContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // Import AuthProvider

const App = () => {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <FavoriteProvider>
        <Router>
          <main className="bg-darkBlue min-h-screen">
            <TopSection />
            <section className="xl:padding-l wide:padding-r padding-b">
              <Routes>
                <Route path="/" element={<MusicSection />} />
                <Route path="/favorites" element={<Favorite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/account" element={<AccountPage />} /> {/* Add the Account Page route */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes to home */}
              </Routes>
            </section>
          </main>
        </Router>
      </FavoriteProvider>
    </AuthProvider>
  );
};

export default App;
