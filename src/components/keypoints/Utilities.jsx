// PoseDetection.js
import React, { useState, useEffect } from 'react';
import * as cv from 'opencv';
import * as mp from "@mediapipe/tasks-vision";

function PoseDetection() {
    const [pose, setPose] = useState(null);

    useEffect(() => {
        const initPoseDetection = async () => {
            const pose = await mp.PoseLandmarker.create({
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.blob',
                    enableSegmentation: true,
                    useGPU: true
                }
            });
            setPose(pose);
        };
        initPoseDetection();
    }, []);

    const detectPose = async (img) => {
        const results = await pose.process(img);
        return results.poseLandmarks;
    };

    const drawKeypoints = (img, landmarks) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        for (const landmark of landmarks) {
            const { x, y } = landmark;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
        return canvas.toDataURL();
    };

    const calculateAngle = (pointA, pointB, pointC) => {
        const AB = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
        const BC = Math.sqrt(Math.pow(pointC.x - pointB.x, 2) + Math.pow(pointC.y - pointB.y, 2));
        const AC = Math.sqrt(Math.pow(pointC.x - pointA.x, 2) + Math.pow(pointC.y - pointA.y, 2));
        return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / Math.PI);
    };

    const processImage = async (imageSrc) => {
        const image = await cv.imread(imageSrc);
        const poseLandmarks = await detectPose(image);
        const angles = {};
        for (const key in angle_dct_info) {
            const [pointA, pointB, pointC] = angle_dct_info[key];
            const angle = calculateAngle(poseLandmarks[pointA], poseLandmarks[pointB], poseLandmarks[pointC]);
            angles[key] = angle;
        }
        const isValidPose = checkPoseValidity(angles);
        const resultImageUrl = drawKeypoints(imageSrc, poseLandmarks, isValidPose);
        return resultImageUrl;
    };

    const checkPoseValidity = (angles) => {
        for (const key in angles) {
            if (angles.hasOwnProperty(key)) {
                const angle = angles[key];
                const [minAngle, maxAngle] = angle_joint_range[key];
                if (angle < minAngle || angle > maxAngle) {
                    return false; // Pose is not valid
                }
            }
        }
        return true; // Pose is valid
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        const resultImageUrl = await processImage(imageUrl);
        document.getElementById('output').src = resultImageUrl;
    };

    return (
        <div>
            <h2>Pose Detection</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <div>
                <img id="output" alt="Output" />
            </div>
        </div>
    );
}

const angle_dct_info = {
    'LEFT-ANKLE': ['LEFT_FOOT_INDEX', 'LEFT_ANKLE', 'LEFT_KNEE'],
    'RIGHT-ANKLE': ['RIGHT_FOOT_INDEX', 'RIGHT_ANKLE', 'RIGHT_KNEE'],
    'LEFT-KNEE': ['LEFT_HIP', 'LEFT_KNEE', 'LEFT_ANKLE'],
    'RIGHT-KNEE': ['RIGHT_HIP', 'RIGHT_KNEE', 'RIGHT_ANKLE'],
    'HIP': ['LEFT_KNEE', 'LEFT_HIP', 'LEFT_SHOULDER'],
    'LEFT-TORSO': ['LEFT_SHOULDER', 'LEFT_HIP', 'LEFT_PERPENDICULAR_POINT'],
    'RIGHT-TORSO': ['RIGHT_SHOULDER', 'RIGHT_HIP', 'RIGHT_PERPENDICULAR_POINT'],
    'LEFT-SHOULDER': ['LEFT_HIP', 'LEFT_SHOULDER', 'LEFT_ELBOW'],
    'RIGHT-SHOULDER': ['RIGHT_HIP', 'RIGHT_SHOULDER', 'RIGHT_ELBOW'],
    'LEFT-ELBOW': ['LEFT_WRIST', 'LEFT_ELBOW', 'LEFT_SHOULDER'],
    'RIGHT-ELBOW': ['RIGHT_WRIST', 'RIGHT_ELBOW', 'RIGHT_SHOULDER'],
    'LEFT-WRIST': ['LEFT_INDEX', 'LEFT_WRIST', 'LEFT_ELBOW'],
    'RIGHT-WRIST': ['RIGHT_INDEX', 'RIGHT_WRIST', 'RIGHT_ELBOW']
};

const angle_joint_range = {
    'LEFT-ANKLE': [80, 90],
    'RIGHT-ANKLE': [80, 90],
    'LEFT-KNEE': [170, 190],
    'RIGHT-KNEE': [170, 190],
    'HIP': [170, 190],
    'LEFT-TORSO': [0, 20],
    'RIGHT-TORSO': [0, 20],
    'LEFT-SHOULDER': [0, 45],
    'RIGHT-SHOULDER': [0, 45],
    'LEFT-ELBOW': [45, 190],
    'RIGHT-ELBOW': [45, 190],
    'LEFT-WRIST': [170, 190],
    'RIGHT-WRIST': [170, 190]
};

export default PoseDetection;
