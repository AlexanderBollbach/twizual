import styled, { ThemeProvider } from "styled-components";
import React from "react";
import { Context as ThemeContext } from "src/ThemeProvider";
import { withRouter } from "react-router";
import { Centered } from "src/Style";
import PrettyLetters from "src/Components/PrettyLetters";

const PageTitle = styled.div`
  font-size: ${props => props.theme.primary.fontSize};
  color: ${props => props.theme.primary.textColor};
  background-color: clear;
`;

const TopBarWrapper = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 10% 90%;
  background-color: ${props => props.theme.tersiary.bgColor};
`;

const TopBar = props => (
  <TopBarWrapper>
    {props.showBack && (
      <Centered>
        <BB />
      </Centered>
    )}

    <div
      style={{
        width: "100%",
        height: "100%",
        marginLeft: "12%",
        marginRight: "12%"
      }}
    >
      <PrettyLetters>{props.title}</PrettyLetters>
    </div>
  </TopBarWrapper>
);

const StyledBackButton = styled.button`
width: 80%;
height: 80%
background-color: ${props => props.theme.primary.bgColor}
color: ${props => props.theme.primary.fgColor}
`;

const Back = ({ history }) => (
  <StyledBackButton onClick={history.goBack}>Back</StyledBackButton>
);

var BB = withRouter(Back);
export default TopBar;
