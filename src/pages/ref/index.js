import React from "react";
import FuncComp from "./funcCom";
import ClassComp from "./classCom";

export default class RefComp extends React.Component {
  componentDidMount() {
    // console.log(this.ref1);
    console.log(this.ref2);
  }

  ref1 = React.createRef();
  ref2 = React.createRef();
  //   getRef = (el) => {
  //     console.log(el.refs);
  //     this.ref1 = el;
  //   };
  render() {
    console.log("render");
    return (
      <div>
        <ClassComp ref={this.ref1} />
        <button
          onClick={() => {
            this.setState({});
          }}
        >
          点击
        </button>
        <FuncComp />
        <FuncComp ref={this.ref2} />
      </div>
    );
  }
}
