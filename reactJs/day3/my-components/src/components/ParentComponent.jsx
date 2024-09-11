import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const [message, setMessage] = useState('');

    const showMessage = () => {
        setMessage('Hello from Parent Component!'); 
    };

    return (
        <div className="parent-box">
            <h2>Parent Component</h2>

            <ChildComponent showMessage={showMessage} />

            {message && <p>{message}</p>}
        </div>
    );
}

export default ParentComponent;
