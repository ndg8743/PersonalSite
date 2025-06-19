import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// Import the clean Home implementation
import Home from './pages/Home_clean';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import MatrixBackground from './components/animations/MatrixBackground';
import './styles/globals.css';

const App = () => {
  return (
    <Router>
      <div style={{ 
        minHeight: '100vh', 
        background: 'black', 
        color: 'white', 
        position: 'relative',
        fontFamily: 'Inconsolata, monospace'
      }}>
        <MatrixBackground />
        <Header />
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;