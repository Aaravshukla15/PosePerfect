import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function WebcamVideo() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(async () => {
        setCapturing(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamRef.current.srcObject = stream;

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "video/webm",
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            mediaRecorderRef.current.start();
        } catch (error) {
            console.error('Error accessing camera:', error);
            setCapturing(false);
        }
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleUpload = useCallback(async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/mp4",
            });

            try {
                const formData = new FormData();
                formData.append('video', blob);

                const response = await axios.post('http://localhost:8001/posts', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    console.log('Video uploaded successfully');
                    setRecordedChunks([]);
                } else {
                    console.error('Failed to upload video:', response.statusText);
                }
            } catch (error) {
                console.error('Error uploading video:', error);
            }
        }
    }, [recordedChunks]);



    return (
        <div className="Container">
            <Webcam
                height={400}
                width={400}
                audio={false}
                mirrored={true}
                ref={webcamRef}
            />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                <button onClick={handleStartCaptureClick}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button onClick={handleUpload}>uploadload</button>
            )}
        </div>
    );
}
