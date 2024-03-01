import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export const Test = forwardRef(function (props, ref) {
  const [n, setN] = useState(0);

  useImperativeHandle(
    ref,
    () => {
      return {
        setN,
      };
    },
    []
  );

  return <div>{n}</div>;
});

export default function Imperative() {
  const ref = useRef(null);
  return (
    <div>
      <Test ref={ref} />
      <button onClick={() => ref.current.setN((n) => n + 1)}>加1</button>
    </div>
  );
}
