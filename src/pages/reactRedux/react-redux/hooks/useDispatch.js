import { useContext } from "react";
import ReactReduxContext from "../context";

export default function useDispatch() {
  const store = useContext(ReactReduxContext);

  return store.dispatch;
}
