import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from 'axios';
// import user from '../redirect/Redirect'
import { Button } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';


const Category = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [exData, setExData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/Exercise/details/all/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setExData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching yoga data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const [displayedExercises, setDisplayedExercises] = useState(14); // Initial number of displayed exercises

    const handleViewMore = () => {
        setDisplayedExercises(displayedExercises + 14); // Increase the number of displayed exercises
    };

    const handleExerciseClick = async (poseName) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/Exercise/details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ POSE: poseName }) // Send pose name in the request body
            });
            console.log("succses")

            if (!response.ok) {
                throw new Error('Failed to fetch exercise details');
            }

            const data = await response.json();
            // Handle the fetched exercise data as needed
            console.log(data);
            console.log("Succsess")
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
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className='exerlist'>
                            {exData.slice(0, displayedExercises).map((exercise, index) => (
                                <div key={index} className='exer'>
                                    <span onClick={handleExerciseClick} > <a href='/exdetail'>{exercise}</a></span>
                                </div>
                            ))}
                        </div>)}
                    {displayedExercises < exData.length && (
                        <div style={{ textAlign: 'center', margin: '20px' }}>
                            <Button variant="contained" color="primary" onClick={handleViewMore} className='vm'>View More</Button>
                        </div>
                    )}
                </div>
                {/* <div className='cate-yoga'>
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
                </div> */}

            </div>

            <Footer />
        </div>
    );
};

export default Category;
