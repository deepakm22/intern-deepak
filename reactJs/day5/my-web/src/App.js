import React from 'react';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Content from './Components/Content';
import Footer from './Components/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; 
`;



const App = () => {
  return (
    <AppContainer>
      <Header />
        <Sidebar />
        <Content />
    
      <Footer />
    </AppContainer>
  );
};

export default App;
