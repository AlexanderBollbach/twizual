import React from "react";

let theme = {
  primary: {
    fgColor: "#ff1122",
    bgColor: "#001122",
    textColor: "#ff3344",
    fontSize: "1.5em"
  },
  secondary: {
    fgColor: "#ee1122",
    bgColor: "#001122",
    textColor: "#ff3344",
    fontSize: "1em"
  },
  tersiary: {
    fgColor: "#ee1122",
    bgColor: "#001155",
    textColor: "#ff3344",
    fontSize: "0.2em"
  }
};

const Context = React.createContext(theme);

export { Context };
