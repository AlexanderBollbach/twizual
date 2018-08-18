import React from "react";
import Styled, { keyframes } from "styled-components";

const anis = keyframes`
0% {
    transform: rotate(0deg);
    color: blue;
}
50% {
    transform: rotate(15deg);
    color: purple;
}

60% {
    color: orange;
    transform: translate(5px, -2px);
}
25% {
    transform: rotate(0deg);
    color: red;
}
100% {
    color: green;
}
`;

const LetterList = Styled.div`

	font-family: "VT323", monospace;
	margin: 0;
	padding: 0;
	display: flex;
	letter-spacing: 1em;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const Letter = Styled.div`
	font-size: 2em;
	font-weight: bold;
	color: #000000;
	animation: ${anis} 2.5s infinite;
`;

const PrettyLetters = ({ children }) => {
  let chars = children.split("");
  return (
    <LetterList>
      {chars.map((c, i) => {
        let aniDelay = (i + 1) / chars.length;
        return (
          <Letter style={{ animationDelay: `${aniDelay}s` }} key={i}>
            {c}
          </Letter>
        );
      })}
    </LetterList>
  );
};

export default PrettyLetters;
