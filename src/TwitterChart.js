// lib
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { scaleTime, scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import { connect } from "react-redux";
import { timeFormat } from "d3-time-format";

// state
import {
  screenNameSetActive,
  setActiveDatum,
  setSelectedDatum
} from "Redux/Actions";
import { getTweetDateMaps } from "Redux/Selectors";

// chart
import Chart from "src/Components/Chart/Chart";
import LinePlot from "src/Components/Chart/LinePlot";
import Axis from "src/Components/Chart/Axis";
import ToolTip from "src/Components/Chart/ToolTip";
import HoveringVoronoi from "src/Components/Chart/HoveringVoronoi";

var flatMap = require("array.prototype.flatmap");

import { datumsEqual, linesEqual } from "./Helpers";

class TwitterChart extends Component {
  shouldComponentUpdate(nextProps) {
    let lines = this.props.lines;
    let nextLines = nextProps.lines;
    return true;
  }
  render() {
    const {
      lines,
      screenNameSetActive,
      setActiveDatum,
      activeDatum,
      activeScreenNames,
      setSelectedDatum,
      startingDate,
      endingDate,
      enabledScreenNames
    } = this.props;
    let selectX = d => new Date(d.day);
    let selectY = d => d.tweets.length;

    let xScale = scaleTime()
      .domain([endingDate, startingDate])
      .range([0, 100]);

    let lengths = flatMap(flatMap(lines, m => m.data), m => m.tweets.length);
    // let lengths = lines.flatMap(m => m.data).flatMap(m => m.tweets.length);
    let yScale = scaleLinear()
      .domain(extent(lengths))
      .range([100, 0]);

    let dataMap = {
      selectX,
      selectY,
      xScale,
      yScale
    };

    return (
      <Chart
        margins={{ top: 5, left: 5, right: 2, bottom: 10 }}
        bgColor="darkslateblue"
        bottomAxis={
          <Axis
            ticks={xScale.ticks(10).map(t => {
              return {
                location: xScale(t),
                text: timeFormat("%x")(t)
              };
            })}
          />
        }
        leftAxis={
          <Axis
            ticks={yScale.ticks(6).map(t => {
              return {
                location: yScale(t),
                text: t
              };
            })}
          />
        }
        graph={() =>
          makeGraph({
            dataMap,
            lines,
            screenNameSetActive,
            setActiveDatum,
            activeScreenNames,
            enabledScreenNames,
            activeDatum,
            datumsEqual,
            setSelectedDatum
          })
        }
        toolTip={() => makeToolTip({ activeDatum, dataMap, activeScreenNames })}
      />
    );
  }
}

const makeToolTip = ({ activeDatum, dataMap, activeScreenNames }) => {
  if (!activeDatum) {
    return null;
  }
  return (
    <ToolTip
      rect={ToolTip.getRect(dataMap, activeDatum)}
      title={activeScreenNames[0]}
      date={activeDatum.day}
      tweetCount={activeDatum.tweets.length}
    />
  );
};

const makeGraph = ({
  dataMap,
  lines,
  screenNameSetActive,
  setActiveDatum,
  datumsEqual,
  activeScreenNames,
  activeDatum,
  enabledScreenNames,
  setSelectedDatum
}) => {
  return (
    <g>
      <LinePlot
        {...{
          enabledLines: enabledScreenNames,
          activeLines: activeScreenNames,
          dataMap,
          lines,
          activeDatum,
          strokeColor: "white",
          datumsEqual
        }}
        onSelectLine={lineId => screenNameSetActive(lineId)}
        onSelectDatum={datum => setActiveDatum(datum)}
      />
      <HoveringVoronoi
        isVisible={false}
        dataMap={dataMap}
        lines={lines}
        onSelectLine={sn => screenNameSetActive(sn)}
        onSelectDatum={d => setActiveDatum(d)}
        onClickDatum={d => setSelectedDatum(d)}
        onLeave={() => setActiveDatum(null)}
        linesEqual={linesEqual}
      />
    </g>
  );
};

export default connect(
  ({ twitter: state }) => ({
    lines: getTweetDateMaps(state),
    startingDate: state.dateRange.from,
    endingDate: state.dateRange.to,
    activeDatum: state.activeDatum,
    activeScreenNames: state.activeScreenNames,
    enabledScreenNames: state.enabledScreenNames
  }),
  d =>
    bindActionCreators(
      { screenNameSetActive, setActiveDatum, setSelectedDatum },
      d
    )
)(TwitterChart);
