import React from 'react';

const charStyle = {
    display: 'inline-block',
    padding: '12px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    textAlign: 'center',
    margin: '8px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    userSelect: 'none',
};

function CharComponent({ char, onClick }) {
return (
    <div style={charStyle} onClick={onClick}>
    {char}
    </div>
);
}

export default CharComponent;
