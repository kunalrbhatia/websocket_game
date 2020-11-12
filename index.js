const { randomInt } = require("crypto");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  let ran_no = Math.ceil(Math.random() * 10);
  let score = 0;
  let no_attempt = 0;

  ran_no = Math.ceil(Math.random() * 10);
  ws.send(JSON.stringify({ ran_no: ran_no, score: score }));
  ws.on("message", function incoming(message) {
    let msg = JSON.parse(message);
    if (parseInt(msg.cm) === parseInt(ran_no)) {
      no_attempt = 0;
      score += 1;
      ran_no = Math.ceil(Math.random() * 10);
      ws.send(JSON.stringify({ ran_no: ran_no, score: score, no_attempt: no_attempt }));
    } else if (parseInt(msg.cm) === -1) {
      no_attempt++;
      ran_no = Math.ceil(Math.random() * 10);
      ws.send(JSON.stringify({ ran_no: ran_no, score: score, no_attempt: no_attempt }));
    } else {
      no_attempt = 0;
      score -= 1;
      ran_no = Math.ceil(Math.random() * 10);
      ws.send(JSON.stringify({ ran_no: ran_no, score: score, no_attempt: no_attempt }));
    }
  });
});

app.get("/", (req, res) => res.send("Hello World!"));

server.listen(3000, () => console.log(`Lisening on port :3000`));
