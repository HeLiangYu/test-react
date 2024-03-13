import React, { useCallback } from "react";
import { useState } from "react";

const data = new Array(100000).fill(0).map((v, i) => i);

export default function Index() {
  const containerHeight = 400;
  const itemHeight = 20;
  const itemCount = containerHeight / itemHeight;

  const start = 0;
  const end = itemCount - 1;

  const [diff, setDiff] = useState(data.slice(start, end));
  const [transY, setTransY] = useState(0);

  const handleScroll = useCallback(
    (e) => {
      const { scrollTop } = e.target;
      if (data.length * itemHeight - scrollTop >= containerHeight) {
        setTransY(scrollTop);

        const count = Math.round(scrollTop / itemHeight);

        setDiff(data.slice(count, count + itemCount));
      }
    },
    [itemCount]
  );
  return (
    <div
      className="container"
      style={{
        maxHeight: containerHeight,
        background: "gray",
        overflow: "auto",
        position: "absolute",
        top: 0,
        width: "100%",
      }}
      onScroll={handleScroll}
    >
      <div
        className="scroll"
        style={{ height: data.length * itemHeight }}
      ></div>
      <div
        className="list"
        style={{
          position: "absolute",
          top: 0,
          transform: `translateY(${transY}px)`,
        }}
      >
        {diff.map((key) => (
          <div className="list-item">{key}</div>
        ))}
      </div>
    </div>
  );
}
