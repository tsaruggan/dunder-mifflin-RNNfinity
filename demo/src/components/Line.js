import React from 'react'
// import '../styles/App.css';

function Line({ line }) {
    return (
        <>
            <p>{line[0]}</p>
            <p>{line[1]}</p>
            <br/>
        </>
    )
}

export default Line