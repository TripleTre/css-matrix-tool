import React, { Component } from 'react';
import lenaJPG from './lena.jpg';

class Result extends Component {
  render() {
    const { matrix } = this.props;
    return (
      <img
        alt={'lena'}
        src={lenaJPG}
        style={{
          margin: '400px',
          width: '100px',
          height: '100px',
          transform: `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[2]}, ${matrix[3]}, 0, 0)`
        }}
      />
    );
  }
}

export default Result;
