import React from 'react';
import './login.css';
import {FaArrowAltCircleLeft, FaUser} from 'react-icons/fa';
import {FaLock} from 'react-icons/fa';

const Signup = () => {
  return (
    <div className='body' >
        <div className='wrupper'>
            <form action=''>
               <h1>Login</h1>
               <div className='input-box'>
                <input type='text' placeholder='Username' required />
                <FaUser className='icons' />
               </div> 
               <div className='input-box'>
               <input type='text' placeholder='password' required/>
               <FaLock className='icons' />
                </div>
               <div className='forgot-remember'>
                <label><input type="checkbox"/>Remember Me</label>
                <a href='/'> Forgot Password</a>
               </div>
               <button type='Submit'>Login</button>
               <div className='register-link'>
                    <p>Don't have account? <a href='/'>Register</a></p>
                    
                    <p className='ull'><FaArrowAltCircleLeft /><a href='/'>Back</a> </p>
               </div>
            </form>
        </div>
        </div>
  )
}

export default Signup