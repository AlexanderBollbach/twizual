import ReactDOM from "react-dom";
import React from "react";

import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import configureStore from "Redux/configureStore";
import TwitterViz from "./TwitterViz";

import { fetchTweetsWithUrl } from "./Api";

fetchTweetsWithUrl("./twitter");
fetchTweetsWithUrl("/twitter");
fetchTweetsWithUrl("twitter");

let theme = {
  primary: {
    fgColor: "#ff1122",
    bgColor: "#001122",
    textColor: "#ffffffdd",
    fontSize: "1.5em"
  },
  secondary: {
    fgColor: "#ee1122",
    bgColor: "#001155",
    textColor: "#ff3344",
    fontSize: "1em"
  },
  tersiary: {
    fgColor: "#ee1122",
    bgColor: "#001133",
    textColor: "#ecaeb3",
    fontSize: "0.2em"
  },
  accent: {
    fgColor: "#ee1122",
    bgColor: "#551155",
    textColor: "#ff3344",
    fontSize: "0.2em"
  }
};

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <TwitterViz />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
