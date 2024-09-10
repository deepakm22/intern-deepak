// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom';

// const element = <h1>Hello, World!</h1>;

// ReactDOM.render(element, document.getElementById('root'));



// Question-3

// import React from 'react';
// import ReactDOM from 'react-dom';

// const element = <h1>This is JSX!</h1>;

// ReactDOM.render(element, document.getElementById('root'));


// import React from 'react';
// import ReactDOM from 'react-dom';

// const element = React.createElement(
//   'h1',
//   null,
//   'This is without JSX!'
// );

// ReactDOM.render(element, document.getElementById('root'));


// Question-4

// import React from 'react';
// import ReactDOM from 'react-dom';

// class MyComponent extends React.Component {
//   render() {
//     return <h1>This is a Class Component!</h1>;
//   }
// }

// ReactDOM.render(<MyComponent />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';

      function App() {
        return (
          <div>
            <h1>Hello, Welcome to My React Month</h1>
            <hr />
            <JSXCode />
            <NoJSXCode />
            <ClickCount />
            <StudentList />
          </div>
        );
      }



      function JSXCode() {
        return <h2>This is an example using JSX!</h2>;
      }



      function NoJSXCode() {
        return React.createElement(
          'h2',
          null,
          'This is an example without JSX!'
        );
      }



      class ClickCount extends React.Component {
        constructor(props) {
          super(props);
          this.state = { count: 0, countNew: 0 };
        }



        handleClick = () => {
          this.setState({ count: this.state.count + 1 });
          this.setState({ countNew: this.state.countNew - 1})

        };

        handleClickNew = () => {
          this.setState({ countNew: this.state.countNew - 1})
        }

        render() {
          return (
            <div>
              <h3>Click Count: {this.state.count}</h3>
              <h3>Click Count: {this.state.countNew}</h3>
              <button onClick={this.handleClick}>Click Me!</button>
              {/* <button onClick={this.handleClickNew}>Click Me - !</button> */}

            </div>
          );
        }
      }

      
      
      
      
      function Student(props) {
        return (
          <li>
            {props.name} -- Major: {props.major}
          </li>
        );
      }

      function StudentList() {
        const students = [
          { name: 'Alice', major: 'Math' },
          { name: 'Bob', major: 'Physics' },
          { name: 'Charlie', major: 'Chemistry' }
        ];

        return (
          <div>
            <h3>Student List:</h3>
            <ul>
              {students.map((student, index) => (
                <Student key={index} name={student.name} major={student.major} />
              ))}
            </ul>
          </div>
        );
      }

      ReactDOM.render(<App />, document.getElementById('root'));

