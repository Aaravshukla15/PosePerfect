/* eslint-disable react/prop-types */


import React, { useContext } from 'react';
// import Linearstepper from '../Linearstepper/Linearstepper';
import './Signup.css';
import Firststep from '../flowstepper/firststep';
import SecondStep from '../flowstepper/secondstep';
import ThirdStep from '../flowstepper/thirdstep';
import { Stepper, StepLabel, Step } from '@mui/material';
import { multiStepContext } from '../../StepContext';
import Fourthstep from '../flowstepper/Fourthstep';

// const YourName = () => (
//     <div>
//         <label>Your Name:</label>
//         <input type='text' />
//     </div>
// );

// const LoginCredentials = () => (
//     <div>
//         <label>Email:</label>
//         <input type='email' />
//         <label>Password:</label>
//         <input type='password' />
//     </div>
// );

// const ContactDetails = () => (
//     <div>
//         <label>Contact Number:</label>
//         <input type='tel' />
//         <label>Address:</label>
//         <input type='text' />
//     </div>
// );

// const PersonalInformation = () => (
//     <div>
//         <label>Gender:</label>
//         <select>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//             <option value="unspecified">Don't want to specify</option>
//         </select>
//         <label>Height:</label>
//         <input type='text' />
//         <label>Weight:</label>
//         <input type='text' />
//         <label>Age:</label>
//         <input type='number' />
//     </div>
// );


// const CheckOut_steps = [
//     {
//         name: 'Your Name',
//         Component: () => <div>Whats your Name..?</div>,
//         Component2: () => < YourName />
//     },
//     {
//         name: 'Login Credentials',
//         Component: () => <div>Enter MailId and Create Password </div>,
//         Component2: () => < LoginCredentials />
//     },
//     {
//         name: 'Contact Deatils',
//         Component: () => <div>Provide Your Contact Details</div>,
//         Component2: () => < ContactDetails />
//     },
//     {
//         name: 'Personal Info',
//         Component: () => <div>Tell Your Personal Information</div>,
//         Component2: () => < PersonalInformation />
//     },
// ]

function SignUppages() {

    const { currentStep, finalData } = useContext(multiStepContext);

    const showStep = (step) => {
        switch (step) {
            case 1:
                return <Firststep />
            case 2:
                return <SecondStep />
            case 3:
                return <ThirdStep />
            case 4:
                return <Fourthstep />
            default:
                return null
        };
    }

    return (
        <div className='signups'>
            <div className='pghed'>
                <h2 className='sgup'>Sing Up</h2>
                <div className='centralStepper'>
                    <Stepper style={{ width: "18%" }} activeStep={currentStep - 1} orientation='horizontal'>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                        <Step>
                            <StepLabel></StepLabel>
                        </Step>
                    </Stepper>
                </div>
                {showStep(currentStep)}
                {/* <Linearstepper stepsConfig={CheckOut_steps} /> */}
            </div>
        </div>
    )
}

export default SignUppages;
