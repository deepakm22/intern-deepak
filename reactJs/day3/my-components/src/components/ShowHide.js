import React, { useState } from 'react';

function ShowHideComponent() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hide Component' : 'Show Component'}
            </button>

            {isVisible && (
                <div className="component-box">
                    <p>This component is now visible!</p>
                </div>
            )}
        </div>
    );
}

export default ShowHideComponent;
