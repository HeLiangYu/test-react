import React from "react";
import { Provider, connect } from "react-redux";
import store from "./store";
import {
  Provider as MyProvider,
  useDispatch,
  useSelector,
} from "./react-redux";

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    add: () => dispatch({ type: "add" }),
  };
};
const ConnectTestReactRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestReactRedux);

function TestReactRedux(props) {
  return <div>react-redux</div>;
}

function TestReactRedux2() {
  const dispatch = useDispatch();
  const state = useSelector();

  const handleClick = () => {
    dispatch({ type: "add" });
  };

  return (
    <div>
      TestReactRedux2
      <h1>{state}</h1>
      <button onClick={handleClick}>add</button>
    </div>
  );
}

export default function ReactRedux() {
  return (
    <>
      <Provider store={store}>
        <ConnectTestReactRedux />
      </Provider>
      <MyProvider store={store}>
        <TestReactRedux2 />
      </MyProvider>
    </>
  );
}
