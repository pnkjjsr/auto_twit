require('dotenv').config();
require("isomorphic-fetch");
const express = require('express');
const app = express();
const twit = require("./twit");

app.get('/', (req, res) => {
  const url = `https://newsapi.org/v2/top-headlines?sources=ign&apiKey=${process.env.news_key}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const twitCont = {
        "title": data.articles[0].title,
        "desc": data.articles[0].description,
        "url": data.articles[0].url,
        "urlToImage": data.articles[0].urlToImage
      }
      twit(req, res, twitCont);
    });
});


// [END hello_world]

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
