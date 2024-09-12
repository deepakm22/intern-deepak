import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    padding: 50px;
    background-color: #f8f9fa;
`;

const Heading = styled.h1`
    color: #343a40;
`;

const Paragraph = styled.p`
    color: #495057;
    font-size: 18px;
`;

const SimplePage = () => (
    <Container>
    <Heading>Welcome to My Page</Heading>
    <Paragraph>This is a simple HTML page styled with styled-components.</Paragraph>
    </Container>
);

export default SimplePage;
