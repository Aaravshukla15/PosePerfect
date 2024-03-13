import React, { useState } from 'react';
import Pose from '../../image/Pose Perfect.png';
import './Navbar.css';
import {  NavLink } from 'react-router-dom';


const Navbar = () => {

  const [menuOpen,setMenuOepn] = useState(false);

  return (
    <div className='n-wrapper'>
      <div className='n-left'>
        <img className='n-limg' src={Pose} alt='Pose Perfect Logo'/>
      </div>
      <div className='menu' onClick={() => setMenuOepn(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
      </div>
      <div className='n-right'>
      <div className='n-list'>
        <ul className={menuOpen ? "open" : ""}>
          <li><NavLink className='links' to='/'>Home</NavLink></li>
          <li><NavLink className='links'>Categories</NavLink></li>
          <li><NavLink className='links'>About</NavLink></li>
          
          <button className='buts' >
          <NavLink className='links' to='/signup'>SignUp</NavLink>
          </button>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;