import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import HistoryOopsPage from './Pages/HistoryOopsPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
import SignUp from './Pages/SignUp';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background p-3.5">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/history" element={<HistoryOopsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
