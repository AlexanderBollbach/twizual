import React from "react";
import { Motion, spring } from "react-motion";
import Styled from "styled-components";

const ToolTipDiv = Styled.div`
position: absolute;
color: white;
background-color: ${props => props.theme.secondary.bgColor};
opacity: 0.4;
top: ${props => props.top};
left: ${props => props.left};
width: 20%;
height: 30%;
box-shadow: 5px 5px 4px 1px #00000033;
padding: 5px;
font-family: monospace;
border: 1 solid white;
fontSize: 12;
opacity: 0.8;
display: grid;
gridTemplateRows: 1fr 1fr 1fr 1fr;
gridGap: 5%;
`;

const ToolTip = ({ title, date, tweetCount, rect }) => {
  // let m = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  return (
    <Motion
      style={{
        x: spring(rect.x),
        y: spring(rect.y),
        width: spring(rect.width),
        height: spring(rect.height)
      }}
    >
      {m => {
        return (
          <ToolTipDiv top={`${m.y}%`} left={`${m.x}%`}>
            <div>{title}</div>
            <div>{`${date.toLocaleDateString()}`}</div>
            <div>{`tweets: ${tweetCount}`}</div>
            <div>(click to see tweets)</div>
          </ToolTipDiv>
        );
      }}
    </Motion>
  );
};

export default ToolTip;

ToolTip.getRect = (dataMap, selectedDatum) => {
  if (!selectedDatum) {
    return;
  }

  let padding = 2;
  const toolTipSize = { width: 20, height: 30 };

  let datumLocation = {
    x: dataMap.xScale(dataMap.selectX(selectedDatum)),
    y: dataMap.yScale(dataMap.selectY(selectedDatum))
  };

  let leftSpace = datumLocation.x;
  let topSpace = datumLocation.y;
  let rightSpace = 100 - datumLocation.x;
  let bottomSpace = 100 - datumLocation.y;

  let requiredWidth = toolTipSize.width + 2 * padding;
  let requiredHeight = toolTipSize.height + 2 * padding;

  let amounts = [
    { side: "left", amount: leftSpace - requiredWidth },
    { side: "right", amount: rightSpace - requiredWidth },
    { side: "top", amount: topSpace - requiredHeight },
    { side: "bottom", amount: bottomSpace - requiredHeight }
  ];

  let sortedSides = amounts.sort((a, b) => {
    let x = a.amount,
      y = b.amount;

    if (x > y) {
      return -1;
    } else if (x < y) {
      return 1;
    } else {
      return 0;
    }
  });

  let firstHorizontalSide = sortedSides.filter(
    s => s.side == "left" || s.side == "right"
  )[0];
  let firstVerticalSide = sortedSides.filter(
    s => s.side == "top" || s.side == "bottom"
  )[0];

  let getXLocation = () => ({
    left: datumLocation.x - padding - toolTipSize.width,
    right: datumLocation.x + padding
  });

  let getYLocation = () => ({
    top: datumLocation.y - padding - toolTipSize.height,
    bottom: datumLocation.y + padding
  });

  let xLocation = getXLocation()[firstHorizontalSide.side];
  let yLocation = getYLocation()[firstVerticalSide.side];

  // console.log(`

  // firstHorizontalSide: ${inspect(firstHorizontalSide, false, null)}
  // firstVerticalSide: ${inspect(firstVerticalSide, false, null)}

  // xLocation: ${xLocation}
  // yLocation: ${yLocation}

  // datum.x ${datumLocation.x}
  // datum.y ${datumLocation.y}

  // `);
  return { x: xLocation, y: yLocation, ...toolTipSize };
};
