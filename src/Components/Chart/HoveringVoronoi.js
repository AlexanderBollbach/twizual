import { voronoiData } from "./LinePlotHelpers";
import React, { Component } from "react";

class HoveringVoronoi extends Component {
  shouldComponentUpdate(nextProps) {
    const { lines, linesEqual } = this.props;
    const { lines: newLines } = nextProps;

    if (linesEqual(lines, newLines)) {
      return false;
    }

    return true;
  }

  render() {
    const {
      dataMap,
      lines,
      onSelectLine,
      onSelectDatum,
      onClickDatum,
      isVisible,
      onLeave
    } = this.props;
    return (
      <g onMouseOut={() => onLeave()}>
        {voronoiData(dataMap, lines).map((el, k) => (
          <path
            onMouseOver={() => {
              onSelectDatum(el.data.datum);
              onSelectLine(el.data.id);
            }}
            onClick={() => {
              onClickDatum(el.data.datum);
            }}
            key={k}
            d={el.path}
            style={{
              fill: "none",
              stroke: isVisible ? "black" : "clear",
              strokeWidth: 0.3,
              pointerEvents: "all"
            }}
          />
        ))}
      </g>
    );
  }
}

export default HoveringVoronoi;
