import React from "react";

export default React.forwardRef(function FuncComp(props, ref) {
  return (
    <div className="FuncComp" ref={ref}>
      FuncComp
    </div>
  );
});
