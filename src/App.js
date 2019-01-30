import React, { Component } from 'react';
import Control from './Control';
import Result from './Result';

class App extends Component {
  constructor(props) {
    super(props);
    this.matrixChangeHandle = this.matrixChangeHandle.bind(this);
    this.state = {
      matrix: [1, 0, 0, 1, 0, 0]
    }
  }

  matrixChangeHandle(matrix) {
    this.setState({
      matrix
    });
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <Control onMatrixChange={this.matrixChangeHandle}></Control>
        <Result matrix={this.state.matrix}></Result>
      </div>
    );
  }
}

export default App;
