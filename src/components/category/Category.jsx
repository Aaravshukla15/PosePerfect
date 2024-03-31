import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from 'axios';
// import user from '../redirect/Redirect'
import { Button } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const Category = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [yogaData, setYogaData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/Yoga/details/all/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setYogaData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching yoga data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const Exercise = [
        "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "PushUps", "PullUps", "Crunches", "Banch Press", "XYZ", "PushUps", "PullUps", "Crunches", "Banch Press", "XYZ", "PushUps", "PullUps", "Crunches", "Banch Press", "XYZ", "PushUps", "PullUps", "Crunches", "Banch Press", "XYZ"
    ];

    const [displayedExercises, setDisplayedExercises] = useState(14); // Initial number of displayed exercises

    const handleViewMore = () => {
        setDisplayedExercises(displayedExercises + 14); // Increase the number of displayed exercises
    };

    const handleExerciseClick = async (poseName) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/Yoga/details/', {
                // method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify({ pose: poseName }) // Send pose name in the request body
                POSE: poseName
            });
            console.log("succses")

            // if (!response.ok) {
            //     throw new Error('Failed to fetch exercise details');
            // }

            // const data = await response.json();
            // // Handle the fetched exercise data as needed
            // console.log(data);
            // console.log("Succsess")
        } catch (error) {
            console.error('Error fetching exercise details:', error);
        }
    };



    return (
        <div className='categuri'>
            <Navbar />

            <div className='cate-main'>
                <div className='cate-ex'>
                    <div className='cate-sp'>
                        <span>Exercises</span>
                        <span>Way to give yourself perfect safe</span>
                    </div>
                    <div className='exerlist'>
                        {Exercise.slice(0, displayedExercises).map((exercise, index) => (
                            <div key={index} className='exer'>
                                <span>{exercise}</span>
                                <Button>Let's Go</Button>
                            </div>
                        ))}
                    </div>
                    {displayedExercises < Exercise.length && (
                        <div style={{ textAlign: 'center', margin: '20px' }}>
                            <Button variant="contained" color="primary" onClick={handleViewMore} className='vm'>View More</Button>
                        </div>
                    )}
                </div>
                <div className='cate-yoga'>
                    <div className='cate-sp'>
                        <span>Yogas</span>
                        <span>Way to interact with inner peace</span>
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className='yogalist'>

                            {yogaData.slice(0, displayedExercises).map((yoga, index) => (
                                <div key={index} className='yogi'>
                                    <span>{yoga}</span>
                                    <Button onClick={() => handleExerciseClick(yoga)}>Let's Do</Button>                                </div>
                            ))}
                        </div>)}
                    {displayedExercises < Exercise.length && (
                        <div style={{ textAlign: 'center', margin: '20px' }}>
                            <Button variant="contained" color="primary" onClick={handleViewMore} className='vm'>View More</Button>
                        </div>
                    )}
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Category;
