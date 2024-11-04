import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import InfoView from './views/InfoView';
import ScanView from './views/ScanView';
import SocialView from './views/SocialView';
import MoreView from './views/MoreView';

function App() {
  return (
    <Router>
      <div className="App w-full min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/info" element={<InfoView />} />
          <Route path="/scan" element={<ScanView />} />
          <Route path="/social" element={<SocialView />} />
          <Route path="/more" element={<MoreView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;