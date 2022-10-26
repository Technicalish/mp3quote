var express = require("express");
var app = express();
var fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
var gTTS = require('gtts');
app.get("/quote.mp3", async (request, response) => {
  await response.set("Content-Type", "audio/mpeg");
  await fetch("https://zenquotes.io/api/random").then(result => result.json()).then(async (data) => {
  response.redirect(302, "/custom.mp3?lang=en&text="+data[0].q+" By "+data[0].a)
  }).catch(console.log);
});
app.get('/custom.mp3', async (request, response) => {
  var query = request.query;
  var text = query.text || query.t;
  var lang = query.lang || query.l || "en";
  var supportedLang = ["af", "sq", "ar", "hy", "ca", "zh", "zh-cn", "zh-tw", "zh-yue", "hr", "cs", "da", "nl", "en", "en-au", "en-uk", "en-us", "eo", "fi", "fr", "de", "el", "ht", "hi", "hu", "is", "id", "it", "ja", "ko", "la", "lv", "mk", "no", "pl", "pt", "pt-br", "ro", "ru", "sr", "sk", "es", "es-es", "es-us", "sw", "sv", "ta", "th", "tr", "vi", "cy"];
  if (text && lang && supportedLang.includes(lang)) {
    await response.set("Content-Type", "audio/mpeg");
    var gtts = new gTTS(text, lang);
    await gtts.stream().pipe(response);
  } else {
    await response.status(400).sendFile(process.cwd() + "/400.html");
  }
});
app.get("/favicon.png", (request, response) => response.sendFile(process.cwd() + "/favicon.png"));

app.get("*", async (request, response) => {
  await response.status(404).sendFile(process.cwd() + "/404.html");
});
app.listen(3000);
module.exports = app;
