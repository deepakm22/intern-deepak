import styled from 'styled-components';

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
    width: 100%;
    height: auto;
`;

const CardDescription = styled.div`
    padding: 16px;
    background-color: #fff;
    text-align: center;
`;

const CardComponent = () => (
<Card>
    <CardImage src="https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sample Image" />
    <CardDescription>
    <h3>Card Title</h3>
    <p>This is a description of the card content.</p>
    </CardDescription>
    </Card>
);

export default CardComponent;
