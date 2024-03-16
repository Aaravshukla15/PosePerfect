import React, { useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';


function Secondstep() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);

    return (
        <div>
            <div>
                <TextField label="Email Id" value={userData['emailid']}
                    onChange={(e) => setUserData({ ...userData, emailid: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <TextField label="Create Password" type='password' value={userData['createpassword']}
                    onChange={(e) => setUserData({ ...userData, createpassword: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <TextField label="Confirm Password" type='password'
                    value={userData['confirmpassword']}
                    onChange={(e) => setUserData({ ...userData, confirmpassword: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <Button varient="contained" onClick={() => setStep(1)} color="secondary">Back </Button>
                <Button varient="contained" onClick={() => setStep(3)} color="primary">Next </Button>
            </div>
        </div>
    )
}

export default Secondstep;