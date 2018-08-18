import React from "react";
import { curveLinear as d3CurveLinear, line as d3Line } from "d3-shape";
import { Motion, spring } from "react-motion";
let Line = ({ isActive, dataMap, data, activeDatum, datumsEqual }) => {
  return (
    <g>
      <AnimatedLinePath {...{ data, dataMap, isActive, activeDatum }} />
      <Circles {...{ data, dataMap, activeDatum, datumsEqual }} />
    </g>
  );
};

export default Line;

const Circles = ({ data, dataMap, activeDatum, datumsEqual }) => {
  return data.map((d, k) => {
    let amount = datumsEqual(activeDatum, d) ? 255 : 0;
    let r = datumsEqual(activeDatum, d) ? 1 : 0.4;
    // let m = { amount: amount, r: r };
    return (
      <Motion
        style={{
          r: spring(r),
          amount: spring(amount)
        }}
        key={k}
      >
        {m => (
          <circle
            key={k}
            cx={dataMap.xScale(dataMap.selectX(d))}
            cy={dataMap.yScale(dataMap.selectY(d))}
            fill={`rgba(255,${m.amount}, 255, 1)`}
            style={{ opacity: 1 }}
            r={m.r}
          />
        )}
      </Motion>
    );
  });
};

const AnimatedLinePath = ({ data, dataMap, isActive }) => {
  let path = d3Line()
    .x(d => dataMap.xScale(dataMap.selectX(d)))
    .y(d => dataMap.yScale(dataMap.selectY(d)))
    .curve(d3CurveLinear)(data);
  let opacity = isActive ? 0.8 : 0.1;
  let strokeWidth = isActive ? 0.3 : 0.15;

  return (
    <Motion
      style={{
        opacity: spring(opacity),
        strokeWidth: spring(strokeWidth)
      }}
    >
      {m => (
        <path
          style={{
            stroke: "white",
            fill: "none",
            strokeWidth: m.strokeWidth,
            opacity: m.opacity
          }}
          d={path}
        />
      )}
    </Motion>
  );
};
