import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import ShowHideComponent from './components/ShowHide';
import CounterComponent from './components/Update';
import ParentComponent from './components/ParentComponent';
// import ParentColor from './components/ParentColor';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <h1>React UseState</h1>
    <ShowHideComponent />
    <CounterComponent />
    <ParentComponent />
    {/* <ParentColor /> */}
  </React.StrictMode>
)


