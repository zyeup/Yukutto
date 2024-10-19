import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Map from './pages/map';
import Header from './components/Header'

const App: React.FC = () => {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
};

export default App
