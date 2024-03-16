import React, { useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';

function Fourthstep() {
    const { setStep, userData, setUserData, submitData } = useContext(multiStepContext);

    return (
        <div>
            <div>
                <TextField label="Age" value={userData['age']}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <TextField label="Height" value={userData['height']}
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <TextField label="Weight" value={userData['weight']}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <Button varient="contained" onClick={() => setStep(3)} color="secondary">Back </Button>
                <Button varient="contained" onClick={submitData} color="primary">Submit </Button>
            </div>
        </div>
    )

}

export default Fourthstep
