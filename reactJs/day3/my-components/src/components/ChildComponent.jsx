import React from 'react';

function ChildComponent({ showMessage }) {
    return (
        <div className="child-box">
            <h3>Child Component</h3>
            <button onClick={showMessage}>Call Parent Function</button>
        </div>
    );
}

export default ChildComponent;
