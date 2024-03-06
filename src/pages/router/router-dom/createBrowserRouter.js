import { useEffect, useRef, useState } from "react";
import { createBrowserHistory } from "../history";
import Router from "../router/Router";

export default function BrowserRouter(props) {
  const navigator = useRef();
  if (!navigator.current) {
    navigator.current = createBrowserHistory();
    window.mh = navigator.current;
  }
  const [state, setState] = useState({
    action: navigator.current.action,
    location: navigator.current.location,
  });

  useEffect(() => {
    const unListen = navigator.current.listen((location, action) => {
      setState({
        action,
        location,
      });
    });

    return unListen;
  }, []);

  return (
    <Router navigator={navigator.current} location={state.location}>
      {props.children}
    </Router>
  );
}
