import React from "react";

class ClassComp extends React.Component {
  render() {
    return (
      <div className="ClassComp" ref={this.props.ref1}>
        ClassComp
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => {
  return <ClassComp {...props} ref1={ref} />;
});
