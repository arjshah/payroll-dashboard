import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PayrollDashboard from './PayrollDashboard';
import RawData from './RawData'; // Make sure you have this component created
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/data">Raw Data</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<PayrollDashboard />} />
          <Route path="/data" element={<RawData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;