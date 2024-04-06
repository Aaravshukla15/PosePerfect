import React from 'react';
import './Morefeatures.css';
import Righttop from '../../photo/left-top.png';
import EXBV from '../../photo/exbv.jpg';



const MoreFeatures = () => {
    return (
        <div className='moreExercise'>
            <div className='moreExleft'>
                <span>Your Personalized </span>
                <span>AI Fitness Coach</span>
                <span>Anytime-Anywhere</span>
                <span>"Unlock personalized guidance and refine your exercise form
                    with our AI Fitness Coach, accessible anytime and anywhere you go!"</span>
            </div>
            <div className='moreExright'>
                <img src={EXBV} alt='exav' />
                <img src={Righttop} alt='' />
            </div>
        </div>
    )
}

export default MoreFeatures
