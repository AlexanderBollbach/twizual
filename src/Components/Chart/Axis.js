import React from "react";
import Tick from "./Tick";
import { scaleLinear } from "d3-scale";
import { transString } from "./ChartHelpers";
import {
  axisTrans,
  tickTrans,
  totalMargins,
  rangeFromMargins,
  bothMargins,
  axisTransInsetFromMargins
} from "./AxisHelpers";

let Axis = ({ orientation, margins, ticks }) => {
  let createTicks = () => {
    let scale = scaleLinear()
      .domain([0, 100])
      .range(bothMargins(margins)[orientation]);

    let widthAfterMargins = 100 - totalMargins(margins)[orientation];
    let tickSize = (widthAfterMargins / ticks.length) * 0.01 - 0.005;

    return ticks.map((t, k) => {
      let tickTransform = transString(
        tickTrans(margins, scale(t.location) - (tickSize / 2) * 100, tickSize)[
          orientation
        ]
      );

      return (
        <Tick
          key={k}
          orientation={orientation}
          transform={tickTransform}
          text={t.text}
        />
      );
    });
  };

  let scale = scaleLinear()
    .domain([0, 100])
    .range(rangeFromMargins(margins)[orientation]);

  return (
    <g transform={transString(axisTrans(margins)[orientation])}>
      {createTicks()}
      {/* <rect x="0" y="0" width="100" height="100" fill="green" opacity="0.3" /> */}
      {/* <rect
        {...axisTransInsetFromMargins(margins)[orientation]}
        fill="green"
        opacity="0.5"
        stroke="white"
      /> */}
    </g>
  );
};

Axis.defaultProps = {
  heightScale: 1
};

export default Axis;
