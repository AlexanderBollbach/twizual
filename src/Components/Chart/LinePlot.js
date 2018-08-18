import React from "react";
import Line from "./Line";

const LinePlot = ({
  dataMap,
  lines,
  activeLines,
  enabledLines,
  activeDatum,
  datumsEqual
}) => {
  let enabledLinesToRender = lines.filter(l => enabledLines.indexOf(l.id) > -1);
  return (
    <g
      onMouseOut={() => {
        // onSelectDatum(null)
      }}
    >
      {enabledLinesToRender.map((line, i) => (
        <Line
          {...{
            dataMap,
            datumsEqual,
            activeDatum,
            data: line.data,
            key: i,
            isActive: activeLines.indexOf(line.id) > -1
          }}
        />
      ))}
    </g>
  );
};

export default LinePlot;
