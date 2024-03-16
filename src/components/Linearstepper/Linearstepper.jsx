/* eslint-disable react/prop-types */

import React, { useRef, useState } from 'react';
import { useEffect } from 'react';




const Linearstepper = ({ stepsConfig = [] }) => {

  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  })
  const stepRef = useRef([]);

  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>
  }

  const handleBack = () => {
    setCurrentStep(prevStep => {
      if (prevStep === 1) {
        return prevStep; // Don't decrement if already at the first step
      } else {
        setIsComplete(false); // Reset isComplete if going back
        return prevStep - 1;
      }
    });
  };

  const handleNext = () => {
    setCurrentStep(prevStep => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    })
  };



  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;
  const ActiveComponent2 = stepsConfig[currentStep - 1]?.Component2;


  return (
    <div>
      <div className='steper'>
        {stepsConfig.map((step, index) => {
          return (
            <div key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`steps ${currentStep > index + 1 || isComplete ? "complete" : ""} 
                     ${currentStep === index + 1 ? "active" : ""}`}>
              <div className='stepnumber'>{currentStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (index + 1)}</div>
              <div className={`stepname ${currentStep > index + 1 || isComplete ? "stepname-bold" : "stepname-weak"}`}>{step.name}</div>
            </div>
          );
        })}

        <div className='progressbar'
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <div className='accomment'>
        <ActiveComponent />
      </div>
      <div className='accomm'>
        <ActiveComponent2 />
      </div>

      {!isComplete && (
        <div className='bitndi'>
          {currentStep > 1 && (
            <button className='bitnb' onClick={handleBack}>
              Back
            </button>
          )}
          <button className='bitnn' onClick={handleNext}>
            {currentStep === stepsConfig.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </div>

  )
}

export default Linearstepper;