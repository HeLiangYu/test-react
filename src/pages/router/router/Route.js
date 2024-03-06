import { useContext, useMemo } from "react";
import { locationContext } from "./context";
import matchPath from "../matchPath";
export default function Route(props) {
  const locationContextValue = useContext(locationContext);

  const matchRoute = useMemo(() => {
    const { location } = locationContextValue;
    return matchPath(props.path || "/", location.pathname, {
      exact: props.exact || false,
      strict: props.strict || false,
      sensitive: props.sensitive || false,
    });
  }, [
    locationContextValue,
    props.path,
    props.exact,
    props.strict,
    props.sensitive,
  ]);

  const render = () => {
    return matchRoute ? props.element : null;
  };
  return render();
}
