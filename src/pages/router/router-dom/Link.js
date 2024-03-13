import React, { useCallback, useContext, useMemo } from "react";
import { routerContext } from "../router/context";

export default function Link(props) {
  const navigationValue = useContext(routerContext);

  const href = useMemo(() => {
    const value = navigationValue.navigator.createHref({ pathname: props.to });
    return value;
  }, [navigationValue, props.to]);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (props.replace) {
        navigationValue.navigator.replace(href);
      } else {
        navigationValue.navigator.push(href);
      }
    },
    [navigationValue, props.replace, href]
  );

  return (
    <a href={href} onClick={handleClick}>
      {props.children}
    </a>
  );
}
