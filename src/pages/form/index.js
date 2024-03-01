import React, { Component } from "react";
import Form from "./Form";

export default class index extends Component {
  state = {
    show: false,
  };
  render() {
    return (
      <div>
        <Form>
          账号：
          {this.state.show ? (
            <>
              {/* <p>777</p> */}
              <div className="cc" name="loginId">
                jjj
              </div>
            </>
          ) : (
            <div className="cc" name="loginId">
              jjj
            </div>
          )}
          <button
            onClick={() => {
              this.setState({
                show: !this.state.show,
              });
            }}
          >
            刷新
          </button>
        </Form>
      </div>
    );
  }
}
