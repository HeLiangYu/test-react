import React from "react";
import Ball from "./ball";
export default class ShakeBall extends React.Component {
  state = {
    list: [<Ball />],
  };

  componentDidMount() {
    const timer = setInterval(() => {
      if (this.state.list.length >= 10) {
        clearInterval(timer);
        return;
      }
      this.setState({
        list: [...this.state.list, <Ball />],
      });
    }, 1000);
  }
  render() {
    return <div>{this.state.list}</div>;
  }
}
