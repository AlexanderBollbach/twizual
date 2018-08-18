// lib
import React from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// style
import { Centered } from "src/Style";
// state
import { addScreenName } from "Redux/Actions";

const Wrapper = Styled.div`
display: grid;
grid-template-columns: 25% 75%;
padding: 5;
grid-gap: 15;
height: 90%;
`;

const SuggestedScreenNameWrapper = Styled.div`
background-color: clear;
border: 1px #ffffff4a dotted;
display: flex;
align-items: center;
font-size: 1em;
overflow: scroll;
`;

const Header = Styled(Centered)`
color: ${props => props.theme.primary.textColor};
`;

const SuggestedScreenName = Styled.div`
color: ${props => props.theme.tersiary.textColor};
text-decoration: ${props => (props.isLoaded ? "line-through" : "none")}
text-align: center;
margin-right: 5%;
padding-left: 5%;
padding-right: 5%;
`;
var SuggestedScreenNames = ({
  suggestedScreenNames,
  addScreenName,
  loadedScreenNames
}) => (
  <Wrapper>
    <Header>Suggested Users:</Header>
    <SuggestedScreenNameWrapper>
      {suggestedScreenNames.map((sn, i) => {
        return (
          <SuggestedScreenName
            isLoaded={loadedScreenNames.indexOf(sn) > -1}
            onClick={() => addScreenName(sn)}
            key={i}
          >
            <Centered>{sn}</Centered>
          </SuggestedScreenName>
        );
      })}
    </SuggestedScreenNameWrapper>
  </Wrapper>
);

SuggestedScreenNames.defaultProps = {
  suggestedScreenNames: [
    "BarackObama",
    "kanyewest",
    "VeneThis",
    "rihanna",
    "physorg_com",
    "NeildeGrasseFan",
    "SamHarrisOrg"
  ]
};

export default connect(
  state => ({ loadedScreenNames: Object.keys(state.twitter.screenNames) }),
  d => bindActionCreators({ addScreenName }, d)
)(SuggestedScreenNames);
