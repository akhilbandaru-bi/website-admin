import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Pages from './pages/Pages';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Verticals from './pages/Verticals';
import Blogs from './pages/Blogs';
import CaseStudies from './pages/CaseStudies';
import Leads from './pages/Leads';
import SubscribedUsers from './pages/SubscribedUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<Pages />} />
          <Route path="services" element={<Services />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="verticals" element={<Verticals />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="leads" element={<Leads />} />
          <Route path="subscribed-users" element={<SubscribedUsers />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
