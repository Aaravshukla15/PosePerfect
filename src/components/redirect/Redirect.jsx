// components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Redirect.css';
import Navbar from '../navbar/Navbar';

const Redirect = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    // Redirect to login page if access token is missing
                    window.location.href = '/login';
                    return;
                }

                // Check if access token is expired
                const isAccessTokenExpired = isTokenExpired(accessToken);

                if (isAccessTokenExpired) {
                    // Attempt to refresh token
                    await refreshToken();
                }

                // Fetch user data with the new access token
                const newAccessToken = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/UserProfile/', {
                    headers: {
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                });
                setUser(response.data);
                // console.log(response.data)
                // console.log(response.data[0])

            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();

    }, []);

    const isTokenExpired = (token) => {
        // Decode the token to get the expiration time
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.exp < Date.now() / 1000;
    };

    const refreshToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post('http://127.0.0.1:8000/api/auth/refresh/', {
                refresh: refreshToken,
            });

            localStorage.setItem('access_token', response.data.access);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // Clear tokens and redirect to login page
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Redirect to login page
        window.location.href = '/login';
    };


    const renderUserData = () => {
        if (!user) return null;

        // Define the selected keys you want to include
        const selectedKeys = ['firstname', 'lastname', 'email', 'age', 'height', 'weight', 'contact'];

        return selectedKeys.map(key => (
            <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {user[0][key]}
            </li>
        ));
    };


    return (
        <div className='main'>
            <Navbar />
            <div className='continer'>
                {user ? (
                    <div>
                        <ul>
                            {renderUserData()}
                        </ul>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Redirect;
