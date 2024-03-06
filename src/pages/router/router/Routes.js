import React, { useContext, useMemo } from "react";
import matchPath from "../matchPath";
import { locationContext } from "./context";

export default function Routes(props) {
  const locationValue = useContext(locationContext);
  const render = useMemo(() => {
    let children = [];
    if (Array.isArray(props.children)) {
      children = props.children;
    } else if (props.children) {
      children = [props.children];
    }

    for (const child of children) {
      const { exact = false, strict = false, sensitive = false } = child.props;
      const matchValue = matchPath(
        child.props.path,
        locationValue.location.pathname,
        { exact, strict, sensitive }
      );

      if (matchValue) return child;
    }

    return null;
  }, [props.children, locationValue]);

  return render;
}
