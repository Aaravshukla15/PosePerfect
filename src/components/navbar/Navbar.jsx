
import React, { useState } from 'react';
import Pose from '../../image/OSE__1_-removebg-preview.png';
import { NavLink, useLocation } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine if the current location is the login page
  const isLoginPage = location.pathname === '/login';

  // Define the button text and link based on the current location
  const buttonText = isLoginPage ? 'Signup' : 'Login';
  const buttonLink = isLoginPage ? '/signup' : '/login';

  return (
    <div className='n-wrapper'>
      <div className='n-left'>
        <img className='n-limg' src={Pose} alt='Pose Perfect Logo' />
      </div>
      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className='n-right'>
        <div className='n-list'>
          <ul className={menuOpen ? 'open' : ''}>
            <li>
              <NavLink className='links' to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink className='links'>Categories</NavLink>
            </li>
            <li>
              <NavLink className='links'>About</NavLink>
            </li>
            <button className='buts'>
              <NavLink className='links' to={buttonLink}>{buttonText}</NavLink>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
