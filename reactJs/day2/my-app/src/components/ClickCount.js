import React from 'react';


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

export default ClickCount;