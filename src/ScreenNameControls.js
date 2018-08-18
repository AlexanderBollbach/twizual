// lib
import React from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// style
import { Centered } from "src/Style";

// state
import {
  toggleScreenNameEnabled,
  screenNameSetActive,
  removeScreenName
} from "./Redux/Actions";

const Grid = Styled.div`
padding: 15;
display: flex;
background-color: ${props => props.theme.tersiary.bgColor}; 
width: 100%;
height: 100%;
overflow: scroll;
`;

const ScreenNameDiv = Styled.div`
color: white;
position: relative;
background-color: ${props => (props.isActive ? "#ffffff33" : "#ffffff33")}
border: ${props =>
  props.isActive ? "3px #ffffff4a dotted" : "1px #ffffff4a dotted"}
margin-right: 5%;
flex-basis: 20%;
text-decoration: ${props => (props.isEnabled ? "none" : "line-through")}
opacity: ${props => {
  return props.isEnabled ? 1 : 0.3;
}}
flex-shrink: 0;
`;

const Delete = Styled.div`
position: absolute;
top: 0%;
left: 0%;
width: 25%;
height: 25%;
color: white;
background-color: red;
text-align: center;
`;

const ScreenNameControls = ({
  screenNames,
  activeScreenNames,
  toggleScreenNameEnabled,
  screenNameSetActive,
  enabledScreenNames,
  removeScreenName
}) => {
  return (
    <Grid>
      {Object.keys(screenNames).map((k, i) => (
        <ScreenName
          isActive={activeScreenNames.indexOf(k) > -1}
          key={i}
          text={k}
          onToggle={() => toggleScreenNameEnabled(k)}
          onSetActive={() => screenNameSetActive(k)}
          isEnabled={enabledScreenNames.indexOf(k) > -1}
          onRemove={() => removeScreenName(k)}
        />
      ))}
    </Grid>
  );
};

const ScreenName = ({
  text,
  onToggle,
  onSetActive,
  isActive,
  isEnabled,
  onRemove
}) => {
  return (
    <ScreenNameDiv
      onMouseOver={() => onSetActive()}
      onClick={() => onToggle()}
      isActive={isActive}
      isEnabled={isEnabled}
    >
      <Centered>{text}</Centered>
      {!isEnabled && (
        <Centered>
          <Delete
            onClick={e => {
              e.stopPropagation();
              onRemove();
            }}
          >
            X
          </Delete>
        </Centered>
      )}
    </ScreenNameDiv>
  );
};

export default connect(
  ({ twitter: state }) => ({
    screenNames: state.screenNames,
    activeScreenNames: state.activeScreenNames,
    enabledScreenNames: state.enabledScreenNames
  }),
  d =>
    bindActionCreators(
      { toggleScreenNameEnabled, screenNameSetActive, removeScreenName },
      d
    )
)(ScreenNameControls);
