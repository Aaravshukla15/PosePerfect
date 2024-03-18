import React, { useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { multiStepContext } from '../../StepContext';

function ThirdStepp() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const formRef = React.useRef();
    return (
        <div>
            <div>
                <TextField required inputRef={formRef} label="Contact Number" type='contact' value={userData['contact']}
                    onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <TextField required inputRef={formRef} label="Address" type='location' value={userData['location']}
                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                    margin='normal' variant='outlined' color='secondary' />
            </div>
            <div>
                <Button varient="contained" onClick={() => setStep(2)} color="secondary">Back </Button>
                <Button varient="contained" onClick={() => { if (formRef.current.reportValidity()) { setStep(4) } }} color="primary">Next </Button>
            </div>
        </div>
    )
}

export default ThirdStepp;