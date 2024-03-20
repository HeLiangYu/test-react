import React from "react";
import ReactReduxContext from "./context";

export default function Provider(props) {
  return (
    <ReactReduxContext.Provider value={props.store}>
      {props.children}
    </ReactReduxContext.Provider>
  );
}
