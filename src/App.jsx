import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login1 from '../src/pages/Login1';
import Dashboard1 from '../src/pages/Dashboard1';
import Pages1 from '../src/pages/Pages1';
import Services1 from '../src/pages/Services1';
import Solutions1 from '../src/pages/Solutions1';
import Verticals1 from '../src/pages/Verticals1';
import Blogs1 from '../src/pages/Blog';
import CreateBlog from '../src/pages/CreateBlog';
import CaseStudies1 from '../src/pages/CaseStudies1';  
import Leads1 from '../src/pages/Leads1';
import SubscribedUsers1 from '../src/pages/SubscribedUsers1';
import BlogList from '../src/pages/BlogList';
import DashboardLayout from '../src/layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard1 />} />
          <Route path="pages" element={<Pages1 />} />
          <Route path="services" element={<Services1 />} />
          <Route path="solutions" element={<Solutions1 />} />
          <Route path="verticals" element={<Verticals1 />} />
          <Route path="blogs" element={<Blogs1 />} />\
          <Route path="blogs/list" element={<BlogList />} />
          <Route path="blogs/create" element={<CreateBlog />} />
          <Route path="case-studies" element={<CaseStudies1 />} />
          <Route path="leads" element={<Leads1 />} />
          <Route path="subscribed-users" element={<SubscribedUsers1 />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
