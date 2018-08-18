import React from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearError } from "./Redux/Actions";

const Dialog = Styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: black;
  opacity: 0.6
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10%;
  // right: 10%;
  left: 10%;
  // right: 10%;
  width: 40%;
  height: 40%
`;

const ErrorDialog = ({ error, clearError }) => {
  return error ? (
    <Dialog>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gridGap: "5%",
          color: "white"
        }}
      >
        {error}
        <button onClick={clearError}>ok</button>
      </div>
    </Dialog>
  ) : null;
};

const mProps = state => {
  return {
    error: state.error
  };
};

const mDisp = d => bindActionCreators({ clearError }, d);

export default connect(
  mProps,
  mDisp
)(ErrorDialog);
