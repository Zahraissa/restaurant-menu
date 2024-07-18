import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Restaurant Menu and Reservation System</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/reservation">Make Reservation</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
