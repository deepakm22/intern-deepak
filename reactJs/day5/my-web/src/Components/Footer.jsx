import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
    background-color:  #1e1e2f;
    color: white;
    text-align: center;
    padding: 15px;
    position: relative;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
    width: 100%;
    max-width: 1200px; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 10px;
`;

const FooterLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const FooterLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 16px;
    &:hover {
    text-decoration: underline;
}
`;

const SocialMedia = styled.div`
    display: flex;
    gap: 15px;
`;

const SocialIcon = styled.a`
    color: white;
    font-size: 20px;
    &:hover {
    color: #333;
}
`;

const FooterBottom = styled.div`
    font-size: 14px;
    color: #ddd;
`;

const Footer = () => {
return (
    <FooterContainer>
    <FooterContent>
        <FooterLinks>
        <FooterLink href="#privacy">Privacy Policy</FooterLink>
        <FooterLink href="#terms">Terms of Service</FooterLink>
        </FooterLinks>
        <SocialMedia>
        <SocialIcon href="https://facebook.com">
            <FaFacebookF />
        </SocialIcon>
        <SocialIcon href="https://twitter.com">
            <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://instagram.com">
            <FaInstagram />
        </SocialIcon>
        </SocialMedia>
    </FooterContent>
    <FooterBottom>&copy; 2024 My App. All rights reserved.</FooterBottom>
    </FooterContainer>
);
};

export default Footer;
