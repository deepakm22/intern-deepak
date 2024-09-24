import React from 'react';
import './App.css';
import CustomComponent from './Components/ButtonComponent';
import CardComponent from './Components/CardComponent';
import SimplePage from './Components/SampleComponent';

function App() {
  return (
    <div className="App">
    
      <h1>My React Styles</h1>
      <CustomComponent />
    <CardComponent />
    <SimplePage />
    </div>
  );
}

export default App;
