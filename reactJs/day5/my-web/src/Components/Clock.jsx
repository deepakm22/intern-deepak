import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ClockDisplay = styled.div`
    font-family: 'Courier New', Courier, monospace;
    font-size: 4rem; 
    color: #61dafb;
`;

const DigitalClock = () => {
        const [time, setTime] = useState(new Date());

useEffect(() => {
    const timerId = setInterval(() => {
    setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
}, []);

const formatTime = (date) => {
    return date.toLocaleTimeString();
};

return (
    <ClockDisplay>
    {formatTime(time)}
    </ClockDisplay>
);
};

export default DigitalClock;
