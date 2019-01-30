import React, { Component } from 'react';

const style = {
  strokeWidth: 1,
  stroke: 'black',
  strokeDasharray: '2, 1'
}

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineAlphaX1: 200,
      lineAlphaX2: 200,
      lineAlphaY1: 200,
      lineAlphaY2: 190,
      lineBetaX1: 200,
      lineBetaX2: 210,
      lineBetaY1: 200,
      lineBetaY2: 200,
      circleYCx: 200,
      circleYCy: 190,
      circleOCx: 200,
      circleOCy: 200,
      circleXCx: 210,
      circleXCy: 200,
      matrix: [1, 0, 0, 1, 0, 0]
    }
    this.isMouseDown = false;
    this.moudeBasePoint = [0, 0];
    this.operate = null;
    this.mouseUpHandle = this.mouseUpHandle.bind(this);
  }

  mouseMoveHandle = e => {
    if (this.isMouseDown) {
      const { offsetX, offsetY } = e.nativeEvent;

      const deltaX = offsetX - this.moudeBasePoint[0];
      const deltaY = offsetY - this.moudeBasePoint[1];

      this.moudeBasePoint = [offsetX, offsetY];

      if (this.operate === 'move') {
        // this.setState({
        //   lineAlphaX1: this.state.lineAlphaX1 + deltaX,
        //   lineAlphaX2: this.state.lineAlphaX2 + deltaX,
        //   lineAlphaY1: this.state.lineAlphaY1 + deltaY,
        //   lineAlphaY2: this.state.lineAlphaY2 + deltaY,
        //   lineBetaX1: this.state.lineBetaX1 + deltaX,
        //   lineBetaX2: this.state.lineBetaX2 + deltaX,
        //   lineBetaY1: this.state.lineBetaY1 + deltaY,
        //   lineBetaY2: this.state.lineBetaY2 + deltaY,
        //   circleYCx: this.state.circleYCx + deltaX,
        //   circleYCy: this.state.circleYCy + deltaY,
        //   circleOCx: this.state.circleOCx + deltaX,
        //   circleOCy: this.state.circleOCy + deltaY,
        //   circleXCx: this.state.circleXCx + deltaX,
        //   circleXCy: this.state.circleXCy + deltaY
        // });
      } else if (this.operate === 'transformY') {
        this.setState({
          circleYCx: this.state.circleYCx + deltaX,
          circleYCy: this.state.circleYCy + deltaY,
          lineAlphaX2: this.state.lineAlphaX2 + deltaX,
          lineAlphaY2: this.state.lineAlphaY2 + deltaY
        }, this.caclMatrix);
      } else if (this.operate === 'transformX') {
        this.setState({
          circleXCx: this.state.circleXCx + deltaX,
          circleXCy: this.state.circleXCy + deltaY,
          lineBetaX2: this.state.lineBetaX2 + deltaX,
          lineBetaY2: this.state.lineBetaY2 + deltaY
        }, this.caclMatrix);
      }
    }
  }

  mouseDownHandle = e => {
    const { offsetX, offsetY } = e.nativeEvent;
    this.moudeBasePoint = [offsetX, offsetY];
    this.isMouseDown = true;
    const targetId = e.target.getAttributeNS(null, 'id');
    this.operate = targetId === 'svg' ? null : targetId;
  }

  mouseUpHandle() {
    this.moudeBasePoint = [0, 0];
    this.isMouseDown = false;
    this.operate = null;
  }

  caclMatrix() {
    if (this.operate === 'move') {
      // css matrix 的平移变换 与 坐标系相关, 省略
      // const {
      //   circleOCx,
      //   circleOCy
      // } = this.state;

      // const deltaX = (circleOCx - 200) / 10;
      // const deltaY = 200 - circleOCy;


    } else {
      // 变换前的线性空间, 两个基向量为 a(对应 x 轴单位向量), b(对应 y 轴单位向量)
      // 假设变换后的两个基向量为 a1 b1
      // 变换前某向量为 a + b, svg 中 10px 对应一个单位向量的长度.
      // 变换后为 n * a1 + m * b1
      // 则有如下方程
      // m * [((this.circleYCx - 200) / 10) * a + ((200 - this.circleYCy) / 10) * b] +
      // n * [((this.circleXCx - 200) / 10) * a + ((200 - this.circleXCy) / 10) * b] = 1 * b + 1 * a
      // 解开有
      // n = [10(YCx - 200) - 10(200 - YCy)] / [(200 - XCy)(YCx - 200) - (XCx - 200)(200 - YCy)] {当 (YCx !== 200)}
      //   = [10(200 - YCy) - 10(YCx - 200)] / [(XCx - 200)(200 - YCy) - (200 - XCy)(YCx - 200)] {当 (YCy !== 200)}
      // m = [10 - (XCx - 200)n] / (YCx - 200) {当 (YCx !== 200)}
      //   = [10 - (200 - XCy)n] / (200 - YCy) {当 (YCy !== 200)}
      //   其中 YCx 和 YCy 不能同时为 0
      // 对于 2 维欧几里得空间，要求一 2 * 2 矩阵 A ，使得 [n, m] * A = [1, 1]
      // 令矩阵为 [[a, c], [b, d]]
      // 则有 n * a + m * b = 1 (i), n * c + m * d = 1 (ii)
      // 在有，变换前某向量为 a - b
      // 变换后该向量为 j * a1 + k * b1
      // 则有如下方程
      // k * [((this.circleYCx - 200) / 10) * a + ((200 - this.circleYCy) / 10) * b] +
      // j * [((this.circleXCx - 200) / 10) * a + ((200 - this.circleXCy) / 10) * b] = -1 * b + 1 * a
      // 解开有
      // j = [-10(YCx -200) - 10(200 - YCy)] / [(200 - XCy)(YCx - 200) - (XCx - 200)(200 - YCy)] {当 (YCx !== 200)}
      //   = [10(200 - YCy) + 10(YCx - 200)] / [(XCx - 200)(200 - YCy) - (200 - XCy)(YCx - 200)] {当 (YCy !== 200)}
      // k = [10 - (XCx - 200)j] / (YCx - 200) {当 (YCx !== 200)}
      //   = [-10 - (200 - XCy)j] / (200 - YCy) {当 (YCy !== 200)}
      // 继续使用上述矩阵，令 [j, k] * A = [1, -1]
      // 则有 j * a + k * b = 1 (iii), j * c + k * d = -1 (iiii)
      // 联合 (i) (ii) (iii) (iiii) 四个方程
      // 可以解得 矩阵 A [[a, c], [b, d]] 为
      // 当 m !== 0
      //    a = (m - k) / (mj - kn)
      //    b = (mj - kn - nm + nk) / (m(mj - kn))
      //    c = (-m - k) / (mj - kn)
      //    d = (mj - kn + mn + nk) / (m(mj - kn))
      // 当 m == 0 且 n !== 0
      //    a = 1 / n
      //    b = (n - j) / (nk)
      //    c = 1 / n
      //    d = (-n - j) / (nk)
      // 对于上面 a b c d 分母为 0 的情况，直接忽略

      const {
        circleYCx,
        circleYCy,
        circleXCx,
        circleXCy
      } = this.state;
      let n, m, j, k, a, b, c, d;

      if (circleYCx !== 200 || circleYCy !== 200) {
        if (circleYCx !== 200) {
          n = (10 * (circleYCx -200) - 10 * (200 - circleYCy)) / ((200 - circleXCy) * (circleYCx - 200) - (circleXCx - 200) * (200 - circleYCy));
          m = (10 - (circleXCx - 200) * n) / (circleYCx - 200);
          j = (-10 * (circleYCx -200) - 10 * (200 - circleYCy)) / ((200 - circleXCy) * (circleYCx - 200) - (circleXCx - 200) * (200 - circleYCy));
          k = (10 - (circleXCx - 200) * j) / (circleYCx - 200);
        } else {
          n = (10 * (200 - circleYCy) - 10 * (circleYCx - 200)) / ((circleXCx - 200) * (200 - circleYCy) - (200 - circleXCy) * (circleYCx - 200));
          m = (10 - (200 - circleXCy) * n) / (200 - circleYCy);
          j = (10 * (200 - circleYCy) + 10 * (circleYCx - 200)) / ((circleXCx - 200) * (200 - circleYCy) - (200 - circleXCy) * (circleYCx - 200));
          k = (-10 - (200 - circleXCy) * j) / (200 - circleYCy);
        }
      }

      if (m !== 0) {
        a = (m - k) / (m * j - k * n);
        b = (m * j - k * n - n * m + n * k) / (m * (m * j - k * n));
        c = (-1 * m - k) / (m * j - k * n);
        d = (m * j - k * n + m * n + n * k) / (m * (m * j - k * n));
      } else {
        a = 1 / n;
        b = (n - j) / (n * k);
        c = 1 / n;
        d = (-1 * n - j) / (n * k);
      }

      a = a.toFixed(2);
      b = b.toFixed(2);
      c = c.toFixed(2);
      d = d.toFixed(2);

      this.setState({
        matrix: [a, b, c, d, this.state.matrix[4], this.state.matrix[5]]
      }, this.dispatchMatrix);
    }
  }

  dispatchMatrix() {
    this.props.onMatrixChange(this.state.matrix);
  }

  render() {
    const {
      lineAlphaX1,
      lineAlphaX2,
      lineAlphaY1,
      lineAlphaY2,
      lineBetaX1,
      lineBetaX2,
      lineBetaY1,
      lineBetaY2,
      circleYCx,
      circleYCy,
      circleOCx,
      circleOCy,
      circleXCx,
      circleXCy
    } = this.state;
    return (
      <div>
        <div>{`基准向量: alpha [(${(circleOCx - 200) / 10}, ${(200 - circleOCy) / 10}), (${(circleYCx - 200) / 10}, ${(200 - circleYCy) / 10})]`}</div>
        <div>{`基准向量: beta  [(${(circleOCx - 200) / 10}, ${(200 - circleOCy) / 10}), (${(circleXCx - 200) / 10}, ${(200 - circleXCy) / 10})]`}</div>
        <div>变换矩阵: {JSON.stringify(this.state.matrix)}</div>
        <svg
          width="400px"
          height="400px"
          viewBox="0 0 400 400"
          style={{background: '#9e9e9e47'}}
          ref={v => this.svgElement = v}
          onMouseMove={this.mouseMoveHandle}
          onMouseDown={this.mouseDownHandle}
          onMouseUp={this.mouseUpHandle}
        >
          <line x1="0" y1="200" x2="400" y2="200" style={style} />
          <line x1="200" y1="0" x2="200" y2="400" style={style} />
          <line x1={lineAlphaX1} y1={lineAlphaY1} x2={lineAlphaX2} y2={lineAlphaY2} style={style} ref={v => this.lineAlpha = v}/>
          <line x1={lineBetaX1} y1={lineBetaY1} x2={lineBetaX2} y2={lineBetaY2} style={style} ref={v => this.lineBeta = v}/>
          <circle cx={circleYCx} cy={circleYCy} r="2" style={style} ref={v => this.circleY = v} id="transformY"></circle>
          <circle cx={circleOCx} cy={circleOCy} r="2" style={style} ref={v => this.circleO = v} id="move"></circle>
          <circle cx={circleXCx} cy={circleXCy} r="2" style={style} ref={v => this.circleX = v} id="transformX"></circle>
        </svg>
      </div>
    );
  }
}

export default Control;
