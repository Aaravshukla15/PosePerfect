import React from 'react';
import './Features.css';
import EXAV from '../../photo/exav.jpg';


const Features = () => {


  return (
    <div class="exercise">
      <div class='exright'>
        <div class="exrightinner">
          <img src={EXAV} alt='exav' />
        </div>
      </div>
      <div class='exleft'>
        <span>YOur Personalized <br /> AI Coach-Anytime <br /> Anywhere</span>
      </div>
    </div>
  );
}

export default Features