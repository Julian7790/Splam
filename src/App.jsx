import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopSection from "./section/TopSection.jsx";
import MusicSection from "./section/MusicSection.jsx";
import Favorite from "./pages/FavoritePages.jsx";
import Login from "./pages/Login.jsx"; 
import Signup from "./pages/Signup.jsx";
import { FavoriteProvider } from './context/FavoriteContext.jsx';

const App = () => {
  return (
    <FavoriteProvider>
      <Router>
        <main className="bg-darkBlue min-h-screen">
          <TopSection />
          <section className="xl:padding-l wide:padding-r padding-b">
            <Routes>
              <Route path="/" element={<MusicSection />} />
              <Route path="/favorites" element={<Favorite />} />
              <Route path="/login" element={<Login />} /> {/* Add the Login route */}
              <Route path="/signup" element={<Signup/>} /> {/* Add the Login route */}
            </Routes>
          </section>
        </main>
      </Router>
    </FavoriteProvider>
  );
};

export default App;
