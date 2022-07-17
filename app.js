var express = require("express");
var app = express();
var fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var gTTS = require('gtts');
app.get("*.mp3", async (request, response) => {
  await fetch("https://api.quotable.io/random").then(result => result.json()).then(data => {
    var gtts = new gTTS((data.content+'By '+data.author), 'en');
    gtts.stream().pipe(response);
  });
});
app.get("*", (request, response) => {
  response.status(503).end();
});
app.listen(3000);