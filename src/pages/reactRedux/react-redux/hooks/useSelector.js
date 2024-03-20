import { useContext, useEffect, useState } from "react";
import ReactReduxContext from "../context";

export default function useSelector(cb) {
  const store = useContext(ReactReduxContext);
  const [state, setState] = useState(
    cb ? cb(store.getState()) : store.getState()
  );

  useEffect(() => {
    const unListen = store.subscribe(() => {
      setState(cb ? cb(store.getState()) : store.getState());
    });

    return unListen;
  }, [store, cb]);

  return state;
}
