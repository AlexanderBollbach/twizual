import React from "react";
import Styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// state
import { addScreenName } from "./Redux/Actions";

// twitter
import SuggestedScreenNames from "./SuggestedScreenNames";
import AddScreenNameForm from "./AddScreenNameForm";

const Box = Styled.div`
background-color: ${props => {
  return props.theme.secondary.bgColor;
}}
display: grid;
grid-gap: 5%;
grid-template-columns 1fr 1fr;
align-items: center;
padding: 15;
`;

const DateControls = () => {
  return (
    <div>
      <select
        onChange={e => {
          debugger;
          console.log(e);
        }}
      >
        <option value="jan">jan</option>
        <option value="feb">feb</option>
        <option value="march">march</option>
      </select>
      <select>
        <option value="jan">jan</option>
        <option value="feb">feb</option>
        <option value="march">march</option>
      </select>
    </div>
  );
};

const TopControls = ({ addScreenName }) => {
  return (
    <Box>
      <AddScreenNameForm onSubmit={sn => addScreenName(sn)} />
      <SuggestedScreenNames />
      {/* <DateControls /> */}
    </Box>
  );
};

export default connect(
  null,
  d => bindActionCreators({ addScreenName }, d)
)(TopControls);
