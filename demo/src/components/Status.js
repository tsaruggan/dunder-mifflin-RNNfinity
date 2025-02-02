import React, { useState, useEffect } from 'react';

export default function Status({ status = 'sleeping' }) {
    const [blink, setBlink] = useState(false);

    let statusColor = '#A41623';
    let statusText = 'Error';

    if (status === 'RUNNING') {
        statusColor = '#67E0A3';
        statusText = 'Running';
    } else if (status === 'BUILDING' || status === 'RUNNING_BUILDING') {
        statusColor = '#FBAF00';
        statusText = 'Building';
    } else if (status === 'SLEEPING') {
        statusColor = '#b7c4c7';
        statusText = 'Sleeping';
    }

    useEffect(() => {
        let intervalId;

        if (status !== 'RUNNING') {
            intervalId = setInterval(() => {
                setBlink((prevBlink) => !prevBlink);
            }, 666);
        } else {
            setBlink(false);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [status]);

    const blinkingStyle = blink && status !== 'RUNNING' ? { opacity: 0 } : {};

    return (
        <div className='statusContainer'>
            <div style={{ fontWeight: 'bold'}}>
                Status: <span style={{ color: statusColor, ...blinkingStyle }}>{statusText}</span>
            </div>
            <div style={{ paddingTop: '8px', fontSize: '14px' }}>You may experience downtime or requests timing out due to free tier resource limits. It might help to check out the <a href='https://huggingface.co/spaces/tsaruggan/dunder-mifflin-RNNfinity'>Hugging Face space</a> directly or clone the <a href='https://github.com/tsaruggan/dunder-mifflin-RNNfinity'>GitHub repository</a> and run the app locally.</div>
        </div>
    );
}