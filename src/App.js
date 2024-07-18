import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Menu from './components/Menu';
import Reservation from './components/Reservation';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Order from './components/Order';
import Feedback from './components/Feedback';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/feedback" element={<Feedback />} />
       
      </Routes>
    </Router>
  );
}

export default App;
