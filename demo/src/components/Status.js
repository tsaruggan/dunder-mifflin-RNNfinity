import React, { useState, useEffect } from 'react';

export default function Status({ status = 'SLEEPING' }) {
    const [blink, setBlink] = useState(false);

    let statusColor = '#A41623';
    let statusText = 'Error';
    if (status === 'RUNNING') {
        statusColor = '#67E0A3';
        statusText = 'Running';
    } else if (status === 'SLEEPING') {
        statusColor = '#b7c4c7';
        statusText = 'Sleeping';
    } else {
        statusColor = '#FBAF00';
        statusText = 'Building';
    }

    useEffect(() => {
        let intervalId;

        if (status !== 'RUNNING') {
            intervalId = setInterval(() => {
                setBlink((prevBlink) => !prevBlink);
            }, 666);
        } else {
            setBlink(false);
            setIsDisabled(true);
        }
        
        return () => {
            clearInterval(intervalId);
        };
    }, [status]);

    const blinkingStyle = blink && status !== 'RUNNING' ? { opacity: 0 } : {};

    const [isDisabled, setIsDisabled] = useState(status === 'RUNNING');

    const handleWakeUpClick = async () => {
        setIsDisabled(true); // Disable the button on click
        await fetch("/api/wake");
    };
      
    return (
        <div className='statusContainer'>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <div style={{ fontWeight: 'bold'}}>
                    Status: <span style={{ color: statusColor, ...blinkingStyle }}>{statusText}</span>
                </div>
                <button
                    onClick={handleWakeUpClick}
                    disabled={isDisabled}
                    style={{
                        backgroundColor: isDisabled ? 'rgb(255, 255, 255, 0.2)' : '#FF5722',
                        color: isDisabled ? 'rgb(0, 0, 0, 0.2)' : '#F1D302',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                      }}                      
                    >
                    Wake up
                </button>



            </div>
            
            <div style={{ paddingTop: '8px', fontSize: '14px' }}>You may experience downtime or requests timing out due to free tier resource limits. It might help to check out the <a href='https://huggingface.co/spaces/tsaruggan/dunder-mifflin-RNNfinity'>Hugging Face space</a> directly or clone the <a href='https://github.com/tsaruggan/dunder-mifflin-RNNfinity'>GitHub repository</a> and run the app locally.</div>
        </div>
    );
}