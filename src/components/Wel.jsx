import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wel = (props) => {
    const navigate = useNavigate();
    return (
        <div className='welscreen' style={{ color: props.mode === "dark" ? "white" : "black" }}>
            <center>
                <h1>&#128218; Dictionary App</h1>
                <img className='searchgif' src="/englishdictionary/searchimage.gif" alt="search img" />
                <button onClick={() => navigate('/wordsearch')}>Search A Word</button>
            </center>
        </div>
    );
}

export default Wel;
