// import React from 'react';
// import './login.css';
// import { FaUser } from 'react-icons/fa';
// import { FaLock } from 'react-icons/fa';
// import Navbar from '../navbar/Navbar';


// const Signup = () => {
//   return (
//     <div className='body'>
//       <Navbar></Navbar>
//       <div className='jodi' >
//         <div className='wrupper'>
//           <form action=''>
//             <h1>Login</h1>
//             <div className='input-box'>
//               <input type='text' placeholder='Username' required />
//               <FaUser className='icons' />
//             </div>
//             <div className='input-box'>
//               <input type='text' placeholder='password' required />
//               <FaLock className='icons' />
//             </div>
//             <div className='forgot-remember'>
//               <label><input type="checkbox" />Remember Me</label>
//               <a href='/'> Forgot Password</a>
//             </div>
//             <button type='Submit'>Login</button>
//             <div className='register-link'>
//               <p>Don't have account? <a href='/'>Register</a></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default Signup
import React, { useState } from 'react';
import './login.css';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';

const Signup = () => {
  const initialLoginData = {
    username: '',
    password: '',
    rememberMe: false
  };

  // State to store login data
  const [loginData, setLoginData] = useState(initialLoginData);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData); // Output the login data
    // You can perform further actions like sending the data to a server here

    // Reset form fields to initial state
    setLoginData(initialLoginData);
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLoginData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  return (
    <div className='body'>
      <Navbar />
      <div className='jodi'>
        <div className='wrupper'>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='input-box'>
              <input
                type='text'
                placeholder='Username'
                name='username'
                value={loginData.username}
                onChange={handleChange}
                required
              />
              <FaUser className='icons' />
            </div>
            <div className='input-box'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <FaLock className='icons' />
            </div>
            <div className='forgot-remember'>
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <a href='/'> Forgot Password</a>
            </div>
            <button type='submit'>Login</button>
            <div className='register-link'>
              <p>Don't have an account? <a href='/signup'>Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
