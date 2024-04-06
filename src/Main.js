import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login/login';
import Signup from './components/signuppages/SignUppages';
import StepContext from './StepContext';
import Redirect from './components/redirect/Redirect';
import Category from './components/category/Category';
import Exdetail from './components/exDetail/Exdetail';
import Videorec from './components/exDetail/Videorec';
import Keypoints from './components/keypoints/Keypoints';



const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },

    {
        path: "login",
        element: <Login />,
    },

    {
        path: "redirect",
        element: <Redirect />,
    },
    {
        path: "keypoints",
        element: <Keypoints />,
    },
    {
        path: "category",
        element: <Category />,
    },
    {
        path: "exdetail",
        element: <Exdetail />,
    },
    {
        path: "videorec",
        element: <Videorec />,
    },
    {
        path: "signup",
        element: <StepContext> <Signup /></StepContext>,
    }
])

function Main() {
    return (
        <RouterProvider router={router} />
    )
}

export default Main;