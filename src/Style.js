import styled, { injectGlobal } from "styled-components";

injectGlobal`
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: white;
  }

  * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
@import url("https://fonts.googleapis.com/css?family=VT323");
`;

export const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
