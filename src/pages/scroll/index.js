import React, { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const data = new Array(100000).fill(0).map((v, i) => i);

export default function Index() {
  const containerHeight = 400;
  const itemHeight = 80;
  const itemCount = 20;

  const start = 0;
  const end = itemCount;

  const [diff, setDiff] = useState(data.slice(start, end));
  const [transY, setTransY] = useState(0);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [top, setTop] = useState(0);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop } = e.target;
      console.log("scrollTop", scrollTop);
      //   if (data.length * itemHeight - scrollTop >= containerHeight) {
      //     setTransY(scrollTop);

      //     const count = Math.round(scrollTop / itemHeight);

      //     setDiff(data.slice(count, count + itemCount));
      //   }
    },
    [itemCount]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.abs(transY) >= 20 * 80) {
        setTransY(0);
      } else {
        setTransY(transY - 2);
      }
    }, 16);
    return () => {
      clearInterval(timer);
    };
  }, [transY]);

  useEffect(() => {
    let timer = null;
    // if (ref1.current && ref2.current) {
    //   const { offsetHeight } = ref2.current;
    //   timer = setInterval(() => {
    //     let currentTop;
    //     if (top >= offsetHeight / 2) {
    //       currentTop = 0;
    //     } else {
    //       currentTop = top + 1;
    //     }
    //     setTop(currentTop);
    //     console.log("top", top);
    //     ref1.current.scrollTop = currentTop;
    //   }, 20);
    // }

    // return () => {
    //   clearInterval(timer);
    // };
  }, [top]);
  return (
    <div
      className="container"
      style={{
        height: containerHeight,
        background: "gray",
        overflow: "auto",
        top: 0,
        width: "100%",
      }}
      onScroll={handleScroll}
      ref={ref1}
    >
      <div
        ref={ref2}
        className="list"
        style={{
          width: "100%",
        }}
        // position: "absolute",
        // top: 0,
        // transform: `translateY(${transY}px)`,
      >
        <div>
          {diff.map((key) => (
            <div className="list-item" style={{ height: 80 }}>
              {key}
            </div>
          ))}
        </div>
        <div>
          {diff.map((key) => (
            <div className="list-item" style={{ height: 80 }}>
              {key}
            </div>
          ))}
        </div>
      </div>
      {/* <div
        style={{
          height: "100%",
          overflow: "auto",
          width: "100%",
          position: "absolute",
          top: 0,
        }}
      >
        <div
          className="scroll"
          style={{ height: itemCount * itemHeight }}
        ></div>
      </div> */}
    </div>
  );
}
