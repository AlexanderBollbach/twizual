import React from "react";
import ExchangeVolumesViz from "src/Visualizations/ExchangeVolumes/ExchangeVolumesViz";
import VizList from "src/Visualizations/VizList";
import VizTest1 from "src/Visualizations/VizTest1/VizTest1";
import VizTest2 from "src/Visualizations/VizTest2/VizTest2";
import TwitterViz from "src/Visualizations/Twitter/TwitterViz";
import { withRouter, Route, Switch } from "react-router";

const PageContent = props => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <VizList
            vizList={Object.keys(vizList).map(k => ({
              ...vizList[k],
              path: k
            }))}
          />
        )}
      />
      <Route
        path="/"
        render={({ location: { pathname } }) => {
          console.log("props");
          console.log(props);
          let c = vizList[pathname.replace(/^\/|\/$/g, "")];
          console.log();
          return <c.component />;
        }}
      />
    </Switch>
  );
};

export default withRouter(PageContent);

const vizList = {
  exchangeVolumes: {
    title: "exchange volumes",
    description:
      "shows volumes for a currency pair across different crpto exchanges",
    component: ExchangeVolumesViz
  },
  // {
  //   name: "opens",
  //   description:
  //     "charts the opening prices for a pair of crpytocurrencies across various markets",
  //   path: "/viz/opens",
  //   component: OpensViz,
  //   fetch: () => {
  //     props.fetchOpensData();
  //   }
  // },

  twitterViz: {
    title: "TwitterViz",
    description: "just a test",
    component: TwitterViz
  }
};
