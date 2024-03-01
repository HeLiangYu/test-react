import React from "react";
import "./ball.css";
import { getRandom } from "../../untils";
export default class ShakeBall extends React.Component {
  state = {
    clientWidth: 0,
    clientHeight: 0,
    position: { x: 0, y: 0 },
    xDir: 5,
    yDir: 5,
  };

  componentDidMount() {
    this.createBall();
  }

  createAni = () => {
    requestAnimationFrame(() => {
      const { clientWidth, clientHeight, xDir, yDir } = this.state;
      const { x, y } = this.state.position;

      let curXDir = xDir,
        curYDir = yDir;
      if (x >= clientWidth || x <= 0) {
        curXDir = -xDir;
      }
      if (y >= clientHeight || y <= 0) {
        curYDir = -yDir;
      }

      this.setState({
        xDir: curXDir,
        yDir: curYDir,
        position: {
          x: x + curXDir,
          y: y + curYDir,
        },
      });

      this.createAni();
    });
  };

  createBall = () => {
    const { clientWidth, clientHeight } = document.documentElement;
    const width = clientWidth - 50;
    const height = clientHeight - 50;

    const x = getRandom(0, width);
    const y = getRandom(0, height);
    this.setState({
      clientWidth: width,
      clientHeight: height,
      position: {
        x,
        y,
      },
    });

    this.createAni();
  };

  render() {
    const { position } = this.state;
    return (
      <div
        className="ball"
        style={{ transform: `translate(${position.x}px,${position.y}px)` }}
      />
    );
  }
}
