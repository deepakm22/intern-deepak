import React from 'react';
import styled from 'styled-components';
import { FaHome, FaUserFriends, FaTasks } from 'react-icons/fa';

const SidebarContainer = styled.div`
    background-color: #1e1e2f;
    color: white;
    height: 100vh;
    width: 250px;
    padding: 20px;
    position: fixed;
    left: 0;
    top: 60px; 
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;


const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    margin: 20px 0;
    font-size: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #c7c7db;
    transition: 0.3s;

    &:hover {
    color: #c7c7db;
    transform: translateX(10px);
}
`;

const NavIcon = styled.span`
    margin-right: 10px;
`;

const SidebarFooter = styled.div`
    font-size: 14px;
    text-align: center;
    padding: 10px 0;
    color: #aaa;
`;

const Sidebar = () => {
return (
    <SidebarContainer>
    <div>
        <NavList>
        <NavItem>
            <NavIcon><FaHome /></NavIcon>
            Home
        </NavItem>
        <NavItem>
            <NavIcon><FaUserFriends /></NavIcon>
            Friends
        </NavItem>
        <NavItem>
            <NavIcon><FaTasks /></NavIcon>
            Tasks
        </NavItem>
        </NavList>
    </div>
    <SidebarFooter>&copy; 2024 My App</SidebarFooter>
    </SidebarContainer>
);
};

export default Sidebar;
