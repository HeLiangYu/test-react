import React, { Component } from "react";
import ctx, { Consumer } from "./ctx";

export default class FormInput extends Component {
  static contextType = ctx;

  handleChange = (data) => {
    this.context.changeFormData(this.props.name, data);
  };
  render() {
    return (
      <input
        value={this.context.formDate[this.props.name]}
        onChange={this.handleChange}
      />
    );
  }
}
