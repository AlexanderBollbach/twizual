var express = require("express");
var app = express();
var Axios = require("axios");
var morgan = require("morgan");
app.use(morgan(":method :url"));

app.get("/twitter", (req, response) => {
  getTwitterData(req.query.screen_name, req.query.max_id)
    .then(data => response.json(data))
    .catch(error => response.json({ error: "invalid screen name" }));
});
app.use(express.static(__dirname + "/dist"));
// app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));

app.listen(process.env.PORT || 8083);

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
// const mockTweets = [
//   {
//     created_at: "7/12/2018",
//     id: 3,
//     text:
//       "testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
//   },
//   { created_at: "7/13/2018", id: 3, text: "the 13" },
//   { created_at: "7/22/2018", id: 3, text: "on 22" },
//   { created_at: "7/22/2018", id: 3, text: "on 22 two" },
//   { created_at: "7/22/2018", id: 3, text: "on 22 two" },
//   { created_at: "7/22/2018", id: 3, text: "on 22 two" },
//   { created_at: "7/23/2018", id: 3, text: "on 22 two" },
//   {
//     created_at: "7/23/2018",
//     id: 3,
//     text: "flockaflocka flocka flocka flockaflocka"
//   },
//   {
//     created_at: "7/23/2018",
//     id: 3,
//     text: "onflockaflockaflockaflockaflocka 22 two"
//   },
//   { created_at: "7/23/2018", id: 3, text: "on 2flockaflocka2 two" },
//   { created_at: "7/23/2018", id: 3, text: "on 2flocka2 two" },
//   { created_at: "7/23/2018", id: 3, text: "on 2flocka2 two" },
//   {
//     created_at: "7/23/2018",
//     id: 3,
//     text:
//       "testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatestaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
//   },
//   { created_at: "7/30/2018", id: 3, text: "on 2flocka2 two" }
// ];
