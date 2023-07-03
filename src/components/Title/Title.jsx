import React from 'react';
import './Title.css';

const Title =({ text }) =>{
    const {text }= props;
    return(
        <div class='title-container'>
            <label className='title-label'> {text}</label>
        </div>
    )
};

export default Tilte; 
