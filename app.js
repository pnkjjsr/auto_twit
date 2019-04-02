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

      var rno = Math.floor(Math.random() * 10)
      console.log(rno);

      const twitCont = {
        "title": data.articles[rno].title,
        "desc": data.articles[rno].description,
        "url": data.articles[rno].url,
        "urlToImage": data.articles[rno].urlToImage
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
