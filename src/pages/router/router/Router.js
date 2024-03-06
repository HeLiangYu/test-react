import { useMemo } from "react";
import { routerContext, locationContext } from "./context";

export default function Router(props) {
  const navigationValue = useMemo(() => {
    return {
      navigator: props.navigator,
    };
  }, [props.navigator]);

  const locationValue = useMemo(() => {
    return {
      location: props.location,
    };
  }, [props.location]);

  return (
    <routerContext.Provider value={navigationValue}>
      <locationContext.Provider value={locationValue}>
        {props.children}
      </locationContext.Provider>
    </routerContext.Provider>
  );
}
