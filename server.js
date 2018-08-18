var express = require("express");
var app = express();
var path = require("path");
var Axios = require("axios");
var url = require("url");
const util = require("util");
const { KanyeWestData, DonaldTrumpData } = require("./src/LocalTwitterData");

var morgan = require("morgan");

let log = (title, content) => {
  console.log(title);
  console.log(content);
};

app.use(morgan(":method :url"));

// ugh have to put api routes before static/htmlEvery route so they are caught first

// app.get("/exchangeVolumes", (req, res) => {
//   const _req = {
//     baseURL: "https://min-api.cryptocompare.com/data/top/exchanges",
//     // url: "data/top/exchange",
//     params: {
//       fsym: req.query.fsym,
//       tsym: req.query.tsym
//     }
//   };

//   Axios(_req).then(r => {
//     const data = r.data.Data;

//     let results = data.map(e => {
//       return { exchange: e.exchange, volume: e.volume24h };
//     });

//     res.send(results);
//   });
// });

app.get("/opens", (req, res) => {
  const _req = {
    baseURL: "https://min-api.cryptocompare.com/",
    url: "data/histohour",
    params: {
      fsym: req.query.fsym,
      tsym: req.query.tsym,
      limit: 30,
      aggregate: 3,
      e: "CCCAGG"
    }
  };

  Axios(_req).then(function(response) {
    const data = response.data.Data;

    const datapoints = data.slice(0, 10).map(element => ({
      open: element.open,
      time: element.time
    }));

    res.json(datapoints);
  });
});

app.get("/twitter", (req, response) => {
  // response.json(mockTweets);
  getTwitterData(req.query.screen_name, req.query.max_id)
    .then(data => {
      response.json(data);
    })
    .catch(error => {
      response.json({ error: "invalid screen name" });
    });
});

app.use(express.static(__dirname + "/dist"));
app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));

app.listen(process.env.PORT || 8083);

console.log("running on port 8080");

////// DOCS

// https://min-api.cryptocompare.com/

getTwitterData = (name, maxId) => {
  return Axios({
    url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
    params: {
      screen_name: name,
      max_id: maxId,
      count: "300"
    },
    headers: {
      Authorization:
        "bearer AAAAAAAAAAAAAAAAAAAAAIoNxwAAAAAAbHlvyN8QEEAKnSsmI5L9JErftCI%3Dn2Ez8d7L7ZeNX5AB4H3rD9thpMVquLiHVSPKuZohiZf82OBgEX"
    }
  }).then(data => {
    let tweets = data.data.map(tweet => {
      return { created_at: tweet.created_at, text: tweet.text, id: tweet.id };
    });
    return tweets;
  });
};
const mockTweets = [
  {
    created_at: "7/12/2018",
    id: 3,
    text:
      "testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  { created_at: "7/13/2018", id: 3, text: "the 13" },
  { created_at: "7/22/2018", id: 3, text: "on 22" },
  { created_at: "7/22/2018", id: 3, text: "on 22 two" },
  { created_at: "7/22/2018", id: 3, text: "on 22 two" },
  { created_at: "7/22/2018", id: 3, text: "on 22 two" },
  { created_at: "7/23/2018", id: 3, text: "on 22 two" },
  {
    created_at: "7/23/2018",
    id: 3,
    text: "flockaflocka flocka flocka flockaflocka"
  },
  {
    created_at: "7/23/2018",
    id: 3,
    text: "onflockaflockaflockaflockaflocka 22 two"
  },
  { created_at: "7/23/2018", id: 3, text: "on 2flockaflocka2 two" },
  { created_at: "7/23/2018", id: 3, text: "on 2flocka2 two" },
  { created_at: "7/23/2018", id: 3, text: "on 2flocka2 two" },
  {
    created_at: "7/23/2018",
    id: 3,
    text:
      "testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  { created_at: "7/30/2018", id: 3, text: "on 2flocka2 two" }
];
