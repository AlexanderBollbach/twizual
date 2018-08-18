import React from "react";
import { transString } from "./ChartHelpers";
import { Centered } from "src/Style";
import Styled from "styled-components";

const TickLine = Styled.line`
stroke: white//${props => props.theme.accent.bgColor}
`;

const CenteredTickText = Styled(Centered)`
color: ${props => `white`};
font-size: 1em;
text-align: center;
`;

let Tick = ({ orientation, distance, opacity, text, transform }) => {
  let tickLength = 10;
  return (
    <g transform={transform}>
      <TickLine {...getLineAttrs(tickLength)[orientation]} stroke="white" />

      {/* <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="orange"
        opacity="0.5"
        stroke="white"
      /> */}
      <g transform={transString(textGroupTrans(tickLength)[orientation])}>
        <foreignObject width="100" height="100">
          <CenteredTickText>
            {text}
            {/* here is a lot of text that should indeed be wrapped */}
          </CenteredTickText>
        </foreignObject>
      </g>
    </g>
  );
};

let textGroupTrans = tickLength => ({
  top: {
    translation: {
      x: 0,
      y: 0
    },
    scale: {
      width: 1,
      height: (100 - tickLength) / 100
    }
  },
  bottom: {
    translation: {
      x: 0,
      y: tickLength
    },
    scale: {
      width: 1,
      height: (100 - tickLength) / 100
    }
  },
  left: {
    translation: {
      x: 0,
      y: 0
    },
    scale: {
      width: (100 - tickLength) / 100,
      height: 1
    }
  },
  right: {
    translation: {
      x: tickLength,
      y: 0
    },
    scale: {
      width: (100 - tickLength) / 100,
      height: 1
    }
  }
});

Tick.defaultProps = { opacity: 0.6 };

let getLineAttrs = tickLength => ({
  top: {
    x1: 100 - tickLength,
    x2: 100,
    y1: 50,
    y2: 50
  },
  left: {
    x1: 100 - tickLength,
    x2: 100,
    y1: 50,
    y2: 50
  },
  right: {
    x1: 100 - tickLength,
    x2: 100,
    y1: 50,
    y2: 50
  },
  bottom: {
    x1: 50,
    x2: 50,
    y1: 0,
    y2: tickLength
  }
});

export default Tick;
