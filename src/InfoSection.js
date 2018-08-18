import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Styled from "styled-components";

const InfoSectionWrapper = Styled.div`
// background-color: ${props => props.theme.secondary.bgColor}
background-color: #4e5678
font-family: monospace;
color: ${props => props.theme.tersiary.textColor}
display: grid;
grid-gap: 1%;
padding: 1%;
grid-template-rows: 15% 85%;
overflow: hidden;
`;
const TweetsSection = Styled.div`
display: flex;
overflow: scroll;

`;

const Tweet = ({ created_at, text }) => {
  return (
    <TweetDiv>
      <div>{created_at}</div>
      <div>{text}</div>
    </TweetDiv>
  );
};

const TweetDiv = Styled.div`
background-color: clear;
border: 1px #ffffff4a dotted;
flex-basis: 30%;
max-width: fit-content;
flex-shrink: 0;
margin: 5;
padding: 1%;
display: grid;
grid-template-rows: 30% 70%;
overflow: hidden;
font-size: 10px;
`;
const InfoSection = ({ selectedDatum }) => {
  if (!selectedDatum) {
    return <InfoSectionWrapper />;
  }

  return (
    <InfoSectionWrapper>
      <div>{`date: ${selectedDatum.day.toLocaleDateString()}`}</div>
      <TweetsSection>
        {selectedDatum.tweets.map((t, i) => (
          <Tweet key={i} created_at={t.created_at} text={t.text} />
        ))}
      </TweetsSection>
    </InfoSectionWrapper>
  );
};

const mProps = state => ({
  sns: state.screenNames,
  selectedDatum: state.selectedDatum
});

const mDisp = dispatch => bindActionCreators({}, dispatch);
export default connect(
  mProps,
  mDisp
)(InfoSection);
