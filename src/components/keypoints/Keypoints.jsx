// import React, { useRef } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as posenet from "@tensorflow-models/posenet";
// import Webcam from "react-webcam";
// import { drawKeypoints, drawSkeleton } from "./Utilities";

// function Keypoints() {
//     const webcamRef = useRef(null);
//     const canvasRef = useRef(null);

//     //  Load posenet
//     const runPosenet = async () => {
//         const net = await posenet.load({
//             inputResolution: { width: 640, height: 480 },
//             scale: 0.8,
//         });
//         //
//         setInterval(() => {
//             detect(net);
//         }, 100);
//     };

//     const detect = async (net) => {
//         if (
//             typeof webcamRef.current !== "undefined" &&
//             webcamRef.current !== null &&
//             webcamRef.current.video.readyState === 4
//         ) {
//             // Get Video Properties
//             const video = webcamRef.current.video;
//             const videoWidth = webcamRef.current.video.videoWidth;
//             const videoHeight = webcamRef.current.video.videoHeight;

//             // Set video width
//             webcamRef.current.video.width = videoWidth;
//             webcamRef.current.video.height = videoHeight;

//             // Make Detections
//             const pose = await net.estimateSinglePose(video);
//             console.log(pose);

//             drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
//         }
//     };

//     const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
//         const ctx = canvas.current.getContext("2d");
//         canvas.current.width = videoWidth;
//         canvas.current.height = videoHeight;

//         drawKeypoints(pose["keypoints"], 0.6, ctx);
//         drawSkeleton(pose["keypoints"], 0.7, ctx);
//     };

//     runPosenet();

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Webcam
//                     ref={webcamRef}
//                     style={{
//                         position: "absolute",
//                         marginLeft: "auto",
//                         marginRight: "auto",
//                         left: 0,
//                         right: 0,
//                         textAlign: "center",
//                         zindex: 9,
//                         width: 640,
//                         height: 480,
//                     }}
//                 />

//                 <canvas
//                     ref={canvasRef}
//                     style={{
//                         position: "absolute",
//                         marginLeft: "auto",
//                         marginRight: "auto",
//                         left: 0,
//                         right: 0,
//                         textAlign: "center",
//                         zindex: 9,
//                         width: 640,
//                         height: 480,
//                     }}
//                 />
//             </header>
//         </div>
//     );
// }

// export default Keypoints;


// WebcamDetection.js
import React, { useState, useEffect } from 'react';
import { PoseLandmarker, DrawingUtils, FilesetResolver } from "@mediapipe/tasks-vision";

function WebcamDetection() {
    const [poseLandmarker, setPoseLandmarker] = useState(null);
    const [runningMode, setRunningMode] = useState("IMAGE");
    const [webcamRunning, setWebcamRunning] = useState(false);

    useEffect(() => {
        const createPoseLandmarker = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );
            const newPoseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
                    delegate: "GPU"
                },
                runningMode: runningMode,
                numPoses: 2
            });
            setPoseLandmarker(newPoseLandmarker);
        };
        createPoseLandmarker();
    }, [runningMode]);

    const handleClick = async (event) => {
        if (!poseLandmarker) {
            console.log("Wait for poseLandmarker to load before clicking!");
            return;
        }

        if (runningMode === "VIDEO") {
            setRunningMode("IMAGE");
            await poseLandmarker.setOptions({ runningMode: "IMAGE" });
        }

        const allCanvas = event.target.parentNode.getElementsByClassName("canvas");
        for (var i = allCanvas.length - 1; i >= 0; i--) {
            const n = allCanvas[i];
            n.parentNode.removeChild(n);
        }

        poseLandmarker.detect(event.target, (result) => {
            const canvas = document.createElement("canvas");
            canvas.setAttribute("class", "canvas");
            canvas.setAttribute("width", event.target.naturalWidth + "px");
            canvas.setAttribute("height", event.target.naturalHeight + "px");
            canvas.style.left = "0px";
            canvas.style.top = "0px";
            canvas.style.width = event.target.width + "px";
            canvas.style.height = event.target.height + "px";

            event.target.parentNode.appendChild(canvas);
            const canvasCtx = canvas.getContext("2d");
            const drawingUtils = new DrawingUtils(canvasCtx);
            for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                    radius: (data) => DrawingUtils.lerp(data.from ? data.from.z : 0, -0.15, 0.1, 5, 1)
                });
                drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
            }
        });
    };

    const enableCam = (event) => {
        if (!poseLandmarker) {
            console.log("Wait! poseLandmaker not loaded yet.");
            return;
        }

        if (webcamRunning === true) {
            setWebcamRunning(false);
            event.target.innerText = "ENABLE PREDICTIONS";
        } else {
            setWebcamRunning(true);
            event.target.innerText = "DISABLE PREDICTIONS";
        }

        const constraints = {
            video: true
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            const video = document.getElementById("webcam");
            video.srcObject = stream;
            video.addEventListener("loadeddata", predictWebcam);
        });
    };

    let lastVideoTime = -1;
    const predictWebcam = () => {
        const video = document.getElementById("webcam");
        const canvasElement = document.getElementById("output_canvas");
        const canvasCtx = canvasElement.getContext("2d");
        const drawingUtils = new DrawingUtils(canvasCtx);

        if (runningMode === "IMAGE") {
            setRunningMode("VIDEO");
            poseLandmarker.setOptions({ runningMode: "VIDEO" });
        }

        let startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
            lastVideoTime = video.currentTime;
            poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
                for (const landmark of result.landmarks) {
                    drawingUtils.drawLandmarks(landmark, {
                        radius: (data) => DrawingUtils.lerp(data.from ? data.from.z : 0, -0.15, 0.1, 5, 1)
                    });
                    drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
                }
                canvasCtx.restore();
            });
        }

        if (webcamRunning === true) {
            window.requestAnimationFrame(predictWebcam);
        }
    };

    return (
        <div className='webacm-pg'>

            <p>Stand in front of your webcam to get real-time pose detection.</p>
            <div id="liveView" className="videoView">
                <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableCam}>
                    <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__label">ENABLE WEBCAM</span>
                </button>
                <div style={{ position: 'relative' }}>
                    <video id="webcam" style={{ width: '1280px', height: '720px', position: 'absolute' }} autoPlay playsInline></video>
                    <canvas className="output_canvas" id="output_canvas" width="1280" height="720" style={{ position: 'absolute', left: '0px', top: '0px' }}></canvas>
                </div>
            </div>
        </div>
    );
}

export default WebcamDetection;
