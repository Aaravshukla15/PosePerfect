// import React, { useState } from 'react';
// import './login.css';
// import { FaUser } from 'react-icons/fa';
// import { FaLock } from 'react-icons/fa';
// import Navbar from '../navbar/Navbar';

// const Login = () => {
//   const initialLoginData = {
//     username: '',
//     password: '',
//     rememberMe: false
//   };

//   // State to store login data
//   const [loginData, setLoginData] = useState(initialLoginData);

//   // State to store email validation error
//   const [emailError, setEmailError] = useState('');

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(loginData); // Output the login data
//     // You can perform further actions like sending the data to a server here

//     // Reset form fields to initial state
//     setLoginData(initialLoginData);
//   };

//   // Function to handle changes in input fields
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     let newValue = value;

//     // Validate email format if it's the username field
//     if (name === 'username') {
//       newValue = value.trim(); // Remove leading and trailing spaces
//       const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
//       if (!isValidEmail) {
//         setEmailError('Please enter a valid email address');
//       } else {
//         setEmailError('');
//       }
//     }

//     // Update loginData state
//     setLoginData(prevData => ({
//       ...prevData,
//       [name]: newValue
//     }));
//   };

//   return (
//     <div className='body'>
//       <Navbar />
//       <div className='jodi'>
//         <div className='wrupper'>
//           <form onSubmit={handleSubmit}>
//             <h1>Login</h1>
//             <div className='input-box'>
//               <input
//                 type='text'
//                 placeholder='Username'
//                 name='username'
//                 value={loginData.username}
//                 onChange={handleChange}
//                 required
//               />
//               <FaUser className='icons' />
//             </div>
//             {emailError && <p className="error-message">{emailError}</p>}
//             <div className='input-box'>
//               <input
//                 type='password'
//                 placeholder='Password'
//                 name='password'
//                 value={loginData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <FaLock className='icons' />
//             </div>
//             <div className='forgot-remember'>
//               <label>
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={loginData.rememberMe}
//                   onChange={handleChange}
//                 />
//                 Remember Me
//               </label>
//               <a href='/'> Forgot Password</a>
//             </div>
//             <button type='submit'>Login</button>
//             <div className='register-link'>
//               <p>Don't have an account? <a href='/signup'>Register</a></p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import './login.css';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Login = () => {
  const initialLoginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  const history = useNavigate();
  // State to store login data
  const [loginData, setLoginData] = useState(initialLoginData);
  // State to store email validation error
  const [emailError, setEmailError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      // Redirecting to Home page
      history('/redirect');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Validate email format if it's the username field
    if (name === 'email') {
      newValue = value.trim(); // Remove leading and trailing spaces
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue);
      if (!isValidEmail) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }


    // Update loginData state
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
                placeholder='email'
                name='email'
                value={loginData.email}
                onChange={handleChange}
                required
              />
              <FaUser className='icons' />
            </div>
            {emailError && <p className="error-message">{emailError}</p>}
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

export default Login;
