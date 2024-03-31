// import React, { useState } from 'react';
// import './Dropdown.css';
// import { NavLink, useLocation } from 'react-router-dom';
// import handleLogout from '../redirect/Redirect';


// const Dropdown = () => {

//     const location = useLocation();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);


//     // Determine if the current location is the login page
//     const isLoginPage = location.pathname === '/login';

//     // Define the button text and link based on the current location
//     const buttonText = isLoginPage ? 'Logout' : 'Login';
//     const buttonLink = isLoginPage ? { handleLogout } : '/login';

//     const handleLogoutClick = () => {
//         // Perform logout actions here
//         // For example:
//         handleLogout();
//         setIsLoggedIn(false); // Update authentication status
//     };

//     return (
//         <div className='drp-dwn'>
//             <ul className='dp-dn'>
//                 <li className='dli'>Dashboard</li>
//                 <li className='dli'>
//                     <NavLink className='links' to='/redirect'>User Profile</NavLink>
//                 </li>
//                 <li className='dli'>Create New Account</li>
//                 <button className='buts' onClick={isLoggedIn ? handleLogoutClick : null}>
//                     <NavLink className='links' to={buttonLink}>{buttonText}</NavLink>
//                 </button>
//             </ul>
//         </div>
//     )
// }

// export default Dropdown

import React, { useState } from 'react';
import './Dropdown.css';
import { NavLink } from 'react-router-dom';
import handleLogout from '../redirect/Redirect';

const Dropdown = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Define the button text and link based on the current authentication status
    const buttonText = isLoggedIn ? 'Logout' : 'Login';
    const buttonLink = isLoggedIn ? '/logout' : '/login'; // Assuming '/logout' is the logout route

    const handleLogoutClick = () => {
        // Perform logout actions here
        // For example:
        handleLogout();
        setIsLoggedIn(false); // Update authentication status
    };

    // Assuming there's a function to handle login, update setIsLoggedIn accordingly
    const handleLogin = () => {
        // Perform login actions here
        // For example:
        setIsLoggedIn(true); // Update authentication status
    };

    return (
        <div className='drp-dwn'>
            <ul className='dp-dn'>
                <li className='dli'>Dashboard</li>
                <li className='dli'>
                    <NavLink className='links' to='/redirect'>User Profile</NavLink>
                </li>
                <li className='dli'>Create New Account</li>
                <button className='buts' onClick={isLoggedIn ? handleLogoutClick : handleLogin}>
                    <NavLink className='links' to={buttonLink}>{buttonText}</NavLink>
                </button>
            </ul>
        </div>
    );
};

export default Dropdown;
