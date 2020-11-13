// Create WebSocket connection.
var seconds = 10 * 1000;
var _interval;
var msg = null;
var no_attempt = 0;
var score = 0;
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener("message", function (event) {
  seconds = 10 * 1000;
  clearInterval(_interval);
  msg = JSON.parse(event.data);
  no_attempt = msg.no_attempt;
  document.getElementById("msg").innerText = msg.ran_no;
  score = parseInt(msg.score);
  document.getElementById("scr").innerText = score;
  document.getElementById("atm").innerText = msg.no_attempt ? msg.no_attempt : 0;
  if (score === -3) document.getElementById("status").innerText = "Stop, Your have reached lowest score!";
  if (score === 10) document.getElementById("status").innerText = "Stop, Your have reached Highest score!";
  if (score >= 10 || score <= -3) socket.close();
  else if (no_attempt >= 3) {
    socket.close();
    document.getElementById("status").innerText = "Stop, Your have not attempted 3 consecutive tries ";
  } else {
    _interval = setInterval(() => {
      if (seconds > 0) {
        seconds -= 1000;
        document.getElementById("tim").innerText = millisToMinutesAndSeconds(seconds);
      } else {
        socket.send(JSON.stringify({ cm: -1 + "" }));
      }
    }, 1000);
  }
});
const sendMessage = () => {
  var cm = document.getElementById("mts");
  if (cm.value) socket.send(JSON.stringify({ cm: cm.value }));
  cm.value = "";
  cm.focus();
};
