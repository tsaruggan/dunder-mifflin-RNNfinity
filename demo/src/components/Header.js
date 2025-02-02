import React from 'react';
// import '../styles/App.css';

function Header() {
    return (
        <div className="header">
            <h1 id="title">Dunder Mifflin RNNfinity</h1>
            <p id="description">
                A recurrent neural network that generates new dialogues for The Office &nbsp;
                <a href="https://github.com/tsaruggan/dunder-mifflin-RNNfinity" target="_blank" rel="noopener noreferrer">
                    [GitHub]
                </a>
                &nbsp;
                <a href="https://huggingface.co/spaces/tsaruggan/dunder-mifflin-RNNfinity" target="_blank" rel="noopener noreferrer">
                    [Hugging Face]
                </a>
            </p>

        </div>
    )
}

export default Header