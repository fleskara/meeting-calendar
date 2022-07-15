import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import MeetingPage from './components/pages/MeetingPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sastanak/:id" element={<MeetingPage />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
