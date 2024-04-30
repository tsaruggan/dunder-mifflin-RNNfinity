import React from 'react'

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