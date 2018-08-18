import * as React from "react";
import { transString } from "./ChartHelpers";

const Chart = ({ graph, margins, bgColor, leftAxis, bottomAxis, toolTip }) => {
  console.log("render chart");
  return (
    <div style={{ position: "relative" }}>
      <svg
        style={{ width: "100%", height: "100%", backgroundColor: bgColor }}
        preserveAspectRatio="none"
        viewBox={"0 0 100 100"}
      >
        {/* bottom axis */}
        {bottomAxis &&
          React.cloneElement(bottomAxis, {
            orientation: "bottom",
            margins: margins
          })}
        {/* left axis */}
        {leftAxis &&
          React.cloneElement(leftAxis, {
            orientation: "left",
            margins: margins
          })}

        <g transform={transString(graphTrans(margins))}>{graph()}</g>
      </svg>
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: `${margins.top}%`,
          left: `${margins.left}%`,
          width: `${100 - (margins.left + margins.right)}%`,
          height: `${100 - (margins.top + margins.bottom)}%`
        }}
      >
        {toolTip()}
      </div>
    </div>
  );
};

let graphTrans = ({ left, right, top, bottom }) => ({
  translation: {
    x: left,
    y: top
  },
  scale: {
    width: (100 - (left + right)) / 100,
    height: (100 - (top + bottom)) / 100
  }
});

export default Chart;
