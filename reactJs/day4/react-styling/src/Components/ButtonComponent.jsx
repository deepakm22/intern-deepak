import styled from 'styled-components';

const CustomButton = styled.button`
    background-color: ${(props) => props.primary ? '#007bff' : '#6c757d'};
    color: ${(props) => props.primary ? '#fff' : '#fff'};
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.3s ease;

    &:hover {
    background-color: ${(props) => props.primary ? '#0056b3' : '#5a6268'};
}`;


const CustomComponent = () => (
    <div>
    <CustomButton primary>Primary Button</CustomButton>
    <CustomButton>Secondary Button</CustomButton>
    </div>
);

export default CustomComponent;
