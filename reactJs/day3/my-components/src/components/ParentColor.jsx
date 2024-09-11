import React, { useState } from 'react';
import ChildColor from './ChildColor';

function ParentColor() {
    const [color, setColor] = useState('white');

    const changeColor = (newColor) => {
    setColor(newColor);
    };

    return (
    <div className="parent-container" style={{ backgroundColor: color }}>
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React Logo"
        className="logo"
        />
        <h1>Parent Component</h1>
        <p>Select a color</p>

        <div className="child-container">
        <ChildColor changeColor={changeColor} />
        </div>
    </div>
    );
}

export default ParentColor;
