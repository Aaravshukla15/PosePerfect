import React from 'react';
import './Newfeatures.css';
import EXCV from '../../photo/excv.jpg';
import LastLI from '../../photo/prop3rd.png';


const Features = () => {


    return (
        <div className="newExercise">
            <div className='newExright'>
                <img src={EXCV} alt='exav' />
                <img src={LastLI} alt='' />
            </div>
            <div className='newExleft'>
                <span>Your Personalized </span>
                <span>AI Fitness Coach</span>
                <span>Anytime-Anywhere</span>
                <span>"Unlock personalized guidance and refine your exercise form
                    with our AI Fitness Coach, accessible anytime and anywhere you go!"</span>
            </div>
        </div>
    );
}

export default Features