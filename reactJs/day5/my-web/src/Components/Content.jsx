import React from 'react';
import styled from 'styled-components';
import DigitalClock from './Clock'; 

const ContentContainer = styled.main`
    margin-left: 250px; 
    padding: 20px;
    background-color: #f4f4f4;
    height: calc(100vh - 60px); 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    overflow: hidden;
`;

const Section = styled.section`
    background-color: white;
    padding: 30px;
    width: 80%; 
    max-width: 600px; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    text-align: center;
`;

const SectionTitle = styled.h2`
    font-size: 32px; 
    color: #333;
    margin-bottom: 20px;
`;

const ClockContainer = styled.div`
    font-family: 'Courier New', Courier, monospace;
    font-size: 4rem; 
    background-color: #282c34;
    color: #61dafb;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DateDisplay = styled.p`
    font-size: 1.5rem;
    color: #333;
    margin: 10px 0;
`;



const Content = () => {
const currentDate = new Date().toLocaleDateString();

return (
    <ContentContainer>
    <Section>
        <SectionTitle>Current Time</SectionTitle>
        <ClockContainer>
        <DigitalClock />
        </ClockContainer>
        <DateDisplay>{currentDate}</DateDisplay>
        <p style={{ marginTop: '20px', fontSize: '18px', color: '#666' }}>
        Keep track of time with this digital clock. It updates every second to give you the current time.
        </p>
    </Section>
    </ContentContainer>
);
};

export default Content;
