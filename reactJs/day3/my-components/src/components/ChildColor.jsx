import React from 'react';

function ChildColor({ changeColor }) {
    return (
    <div className="child-component">
        <h3>Child Component</h3>
        <button className="btn btn-danger" onClick={() => changeColor('red')}>
        Red
        </button>
        <button className="btn btn-primary" onClick={() => changeColor('blue')}>
        Blue
        </button>
        <button className="btn btn-light" onClick={() => changeColor('yellow')}>
        Yellow
        </button>
    </div>
    );
}

export default ChildColor;
