import React, { Component } from "react";
import { lightCtx } from "./context";

export default class ContentComp extends Component {
  state = {
    k: 8,
  };
  handleClick = () => {
    this.setState({});
  };
  render() {
    return (
      <lightCtx.Provider value={{ k: this.state.k }}>
        <div>
          <button onClick={this.handleClick}>刷新</button>
          <FComp />
          <CComp />
        </div>
      </lightCtx.Provider>
    );
  }
}

function FComp() {
  return (
    <div>
      <lightCtx.Consumer>{(val) => console.log(val)}</lightCtx.Consumer>
    </div>
  );
}

class CComp extends Component {
  static contextType = lightCtx;

  componentDidMount = () => {
    console.log(this.context);
  };

  shouldComponentUpdate() {
    console.log("是否更新");
    return false;
  }

  render() {
    return <div></div>;
  }
}
