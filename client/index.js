// Create WebSocket connection.
var seconds = 10 * 1000;
var _interval;
var msg = null;
var score = 0;
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
const socket = new WebSocket("ws://localhost:3000");
// Connection opened
socket.addEventListener("open", function (event) {
  console.log("Connected to WS Server");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  seconds = 10 * 1000;
  clearInterval(_interval);
  msg = JSON.parse(event.data);
  document.getElementById("msg").innerText = msg.ran_no;
  score = parseInt(msg.score);
  document.getElementById("scr").innerText = score;
  if (score >= 10 || score <= -3) {
    socket.close();
    if (score === -3) document.getElementById("status").innerText = "Stop, Your have reached lowest score!";
    if (score === 10) document.getElementById("status").innerText = "Stop, Your have reached Highest score!";
  } else {
    _interval = setInterval(() => {
      if (seconds > 0) {
        seconds -= 1000;
        document.getElementById("tim").innerText = millisToMinutesAndSeconds(seconds);
      }
    }, 1000);
  }
});

const sendMessage = () => {
  let cm = document.getElementById("mts");
  socket.send(JSON.stringify({ cm: cm.value }));
};
