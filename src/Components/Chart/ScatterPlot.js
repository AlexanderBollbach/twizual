import React from "react";
import { Motion, spring } from "react-motion";

let ScatterPlot = ({ cScale, rScale, xScale, yScale, data }) => {
  return (
    <svg>
      <g>
        {data.map((d, i) => {
          return (
            <Motion
              key={i}
              style={{
                x: spring(xScale(d[0])),
                y: spring(yScale(d[1])),
                red: spring(cScale(d[0])),
                blue: spring(cScale(d[0])),
                r: spring(rScale(d[1]))
              }}
            >
              {m => {
                return (
                  <circle
                    key={i}
                    style={{ fill: `rgb(${m.red},${255},${m.blue})` }}
                    cx={`${m.x}%`}
                    cy={`${m.y}%`}
                    r={m.r}
                    onMouseOver={() => console.log(d)}
                  />
                );
              }}
            </Motion>
          );
        })}
      </g>
    </svg>
  );
};

export default ScatterPlot;
