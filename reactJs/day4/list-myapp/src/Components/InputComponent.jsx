import React from 'react';
import { useState } from 'react';
import ValidationComponent from './ValidationComponent';
import CharComponent from './CharComponent';

function InputComponent() {
    const [text, setText] = useState('');

    const handleChange = (event) => {
    setText(event.target.value);
    };

    const handleCharClick = (index) => {
    setText(text.slice(0, index) + text.slice(index + 1));
    
    };

return (
    <div>
    <input type="text" value={text} onChange={handleChange} className="input-box" placeholder="Enter a Text"/>
    <p>TEXT LENGTH: {text.length}</p>
    <p>{text}</p>
    <ValidationComponent textLength={text.length} />
    <div>
        {text.split('').map((char, index) => (
        <CharComponent
            key={index}
            char={char}
            onClick={() => handleCharClick(index)}
        />
        ))}
    </div>
    </div>
);
}

export default InputComponent;
