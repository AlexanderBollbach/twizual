import React, { Component } from "react";
import { pie, arc } from "d3-shape";
import { scaleOrdinal } from "d3-scale";
import "./PieChart.css";

import Dimensions from "react-dimensions";

import { Motion, spring } from "react-motion";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.updateD3();
  }

  updateD3 = () => {
    this.width = this.props.containerWidth;
    this.height = this.props.containerHeight;
    this.radius = this.height / 2;
    this.colors = scaleOrdinal([
      "red",
      "green",
      "blue",
      "orange",
      "green",
      "white",
      "black"
    ]);
    this.pieChart = pie()
      .sort(null)
      .value(d => d.value);
    this.dataArc = arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);
    this.labelArc = arc()
      .outerRadius(this.radius - 40)
      .innerRadius(this.radius - 40);
  };

  slice = (d, key) => {
    return (
      <g key={key} className="arc">
        <path d={this.dataArc(d)} fill={this.colors(d.data.label)} />

        <text
          fontSize={15}
          dy=".1em"
          transform={`translate(${this.labelArc.centroid(d)})`}
        >
          {d.data.label}
        </text>
      </g>
    );
  };

  interp = () => {
    const { data } = this.props;

    const slices = this.pieChart(data);

    return slices.map((d, i) => {
      return (
        <Motion
          key={i}
          style={{
            startAngle: spring(d.startAngle),
            endAngle: spring(d.endAngle)
          }}
        >
          {foo => {
            let thisSlice = {
              ...d,
              startAngle: foo.startAngle,
              endAngle: foo.endAngle
            };
            return this.slice(thisSlice, i);
          }}
        </Motion>
      );
    });
  };

  pieSVG = () => {
    return (
      <svg
        width={this.width}
        height={this.height}
        viewBox={`0 0 ${this.width} ${this.height}`}
      >
        <g
          transform={`translate(${this.width / 2}, ${this.radius}) scale(0.8)`}
        >
          {this.interp()}
        </g>>
      </svg>
    );
  };

  render() {
    this.updateD3();
    return this.pieSVG();
  }
}

var e = PieChart;
e = Dimensions()(e);
export default e;
