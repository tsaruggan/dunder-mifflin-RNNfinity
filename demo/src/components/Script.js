import React from 'react'
import Line from './Line';
// import '../styles/App.css';

function Script({ script }) {
    return (
        <div className="script">
            {
                script.map((line, index) => {
                    return <Line line={line} key={index} />
                })

            }
        </div>
    )
}

export default Script