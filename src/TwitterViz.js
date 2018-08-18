import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Styled from "styled-components";

// twitter
import TopControls from "./TopControls";
import ErrorDialog from "./ErrorDialog";
import ScreenNameControls from "./ScreenNameControls";
import TwitterChart from "./TwitterChart";
import InfoSection from "./InfoSection";

const Wrapper = Styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-rows: 10% 65% 15% 10%;
position: relative;
border: 1px #ffffff4a dotted;
`;

const TwitterViz = () => {
  return (
    <Wrapper>
      <TopControls />
      <TwitterChart />
      <InfoSection />
      <ScreenNameControls />
      <ErrorDialog />
    </Wrapper>
  );
};

export default TwitterViz;
