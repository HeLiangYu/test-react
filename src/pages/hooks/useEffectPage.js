/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

export default function App() {
  const [, forceUpdate] = useState({});
  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(100);

  console.log("App", { n1, n2 });

  useEffect(() => {
    console.log("all", { n1, n2 });
  });

  useEffect(() => {
    console.log("n1 change", { n1, n2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n1]);

  useEffect(() => {
    console.log("n2 change", { n1, n2 });
  }, [n2]);

  return (
    <div>
      <button
        onClick={() => {
          forceUpdate({});
        }}
      >
        强制刷新
      </button>
      <button
        onClick={() => {
          const n = n1 + 1;
          console.log("n1 修改", n);
          setN1(n);
        }}
      >
        n1++
      </button>
      <button
        onClick={() => {
          const n = n2 + 1;
          console.log("n2 修改", n);
          setN2(n);
        }}
      >
        n2++
      </button>
      <button
        onClick={() => {
          const nn1 = n1 + 1;
          const nn2 = n2 + 1;
          console.log("n1 修改", nn1);
          console.log("n2 修改", nn2);
          setN1(nn1);
          setN2(nn2);
        }}
      >
        同时增加
      </button>
    </div>
  );
}
