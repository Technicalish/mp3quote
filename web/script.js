new URLSearchParams(window.location.search).has("author") && alert("Mohd Ibrahim Irfan Shah");
var audio = document.querySelector("#audio");
var button = document.querySelector("#button");
var form = document.querySelector("#form");
function renewAudio(e) {
audio.src = "/quote.mp3?random="+Math.random();
e && e.target === button && audio.play();
}
button.addEventListener("click", renewAudio);
renewAudio();
function updateAudio(e) {
e.preventDefault();
audio.src = "/custom.mp3?text="+(this["text"].value || "Input something!")+"&lang="+(this["lang"].value || "en");
audio.play();
}
form.addEventListener("submit", updateAudio);