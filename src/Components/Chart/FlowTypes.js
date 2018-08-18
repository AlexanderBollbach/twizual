// @flow
export type Orientation = "top" | "left" | "bottom" | "right";

export type Margins = {
  top: number,
  left: number,
  right: number,
  bottom: number
};

export type AxisDefinition = {
  scale: mixed,
  ticks: number,
  orientation: Orientation
};

export type Tick = {
  location: number,
  text: string
};
