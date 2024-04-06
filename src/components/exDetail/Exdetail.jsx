// import React, { useState, useRef } from 'react';
// import './Exdetail.css';
// import Navbar from '../navbar/Navbar';
// import Footer from '../footer/Footer';
// import { Link } from 'react-router-dom';
// // import React from 'react';


// const Exdetail = () => {

//     const [isCameraOn, setIsCameraOn] = useState(false);
//     const videoRef = useRef(null);


//     const startCamera = () => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(stream => {
//                 videoRef.current.srcObject = stream;
//                 setIsCameraOn(true);
//             })
//             .catch(error => {
//                 console.error('Error accessing camera:', error);
//             });
//     };

//     const stopCamera = () => {
//         if (videoRef.current.srcObject) {
//             const stream = videoRef.current.srcObject;
//             const tracks = stream.getTracks();
//             tracks.forEach(track => track.stop());
//             videoRef.current.srcObject = null;
//             setIsCameraOn(false);
//         }
//     };

//     return (
//         <div className='exd-main'>
//             <Navbar />
//             <div className='exd-top'>
//                 <div className='exd-left'>
//                     <span>Pose</span>
//                     <span>Description</span>
//                     <div>
//                         <video ref={videoRef} style={{ display: isCameraOn ? 'block' : 'none' }} autoPlay />
//                         <button className='exd-btn' onClick={isCameraOn ? stopCamera : startCamera}>

//                             <Link to='/videorec'>{isCameraOn ? 'Stop Camera' : 'Start Camera'}</Link>
//                         </button>
//                     </div>
//                 </div>
//                 <div className='exd-right'>

//                 </div>
//             </div>
//             <br />
//             <div className='exd-bottom'>
//                 <div className='exd-crd'>
//                     <span>Steps</span>
//                     <span></span>
//                 </div>
//                 <div className='exd-crd'>
//                     <span>Advantage</span>
//                     <span></span>
//                 </div>
//                 <div className='exd-crd'>
//                     <span>Precaution</span>
//                     <span></span>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     )
// }

// export default Exdetail

import React, { useState, useRef, useEffect } from 'react';
import './Exdetail.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import poseName from '../category/Category';

const Exdetail = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);
    const [exerciseDetails, setExerciseDetails] = useState(null);

    const pose = poseName


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/Exercise/details/')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setExerciseDetails(data);
            })
            .catch(error => {
                console.error('Error fetching exercise details:', error);
            });
    }, []);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            })
            .catch(error => {
                console.error('Error accessing camera:', error);
            });
    };

    const stopCamera = () => {
        if (videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

    return (
        <div className='exd-main'>
            <Navbar />
            <div className='exd-top'>
                <div className='exd-left'>
                    <span>Pose</span>
                    <span>Description</span>
                    <div>
                        <video ref={videoRef} style={{ display: isCameraOn ? 'block' : 'none' }} autoPlay />
                        <button className='exd-btn' onClick={isCameraOn ? stopCamera : startCamera}>
                            <Link to='/keypoints'>{isCameraOn ? 'Stop Camera' : 'Start Camera'}</Link>
                        </button>
                    </div>
                </div>
                <div className='exd-right'>
                    {/* Display exercise details here */}
                    {exerciseDetails && (
                        <div>
                            <h2>{exerciseDetails.pose}</h2>
                            <p>{exerciseDetails.description}</p>
                            {/* Render other details similarly */}
                        </div>
                    )}
                </div>
            </div>
            <br />
            <div className='exd-bottom'>
                <div className='exd-crd'>
                    <span>Steps</span>
                    {/* Render steps here */}
                </div>
                <div className='exd-crd'>
                    <span>Advantage</span>
                    {/* Render advantage here */}
                </div>
                <div className='exd-crd'>
                    <span>Precaution</span>
                    {/* Render precaution here */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Exdetail;
