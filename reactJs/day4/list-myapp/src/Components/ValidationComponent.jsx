import React from 'react';

function ValidationComponent({ textLength }) {
return (
    <div>
    <h3>
    {textLength < 5 ? 'Text is too short' : 'Text is Too Long'}
    </h3>
    </div>
);
}

export default ValidationComponent;