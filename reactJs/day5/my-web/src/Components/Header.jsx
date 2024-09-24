import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: #1e1e2f;
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 1000; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Logo = styled.h1`
    font-size: 24px;
    margin: 0;
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 20px;
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 16px;
    &:hover {
    text-decoration: underline;
}
`;

const SearchBar = styled.input`
    padding: 8px;
    border-radius: 20px;
    border: none;
    outline: none;
`;

const Header = () => {
return (
    <HeaderContainer>
    <Logo>My App</Logo>
    <NavLinks>
        <NavLink href="#home">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#contact">Contact</NavLink>
    </NavLinks>
    <SearchBar type="text" placeholder="Search..." />
    </HeaderContainer>
);
};

export default Header;
