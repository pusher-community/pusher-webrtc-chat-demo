var config;
try {
  config = require("./config");
} catch(e) {
  console.log("Failed to find local config, falling back to environment variables");
  config = {
    app_id: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET
  }
}

var express = require("express");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");

var app = express();
var root = __dirname + "/../..";

// --------------------------------------------------------------------
// SET UP PUSHER
// --------------------------------------------------------------------
var Pusher = require("pusher");
var pusher = new Pusher({
  appId: config.app_id,
  key: config.key,
  secret: config.secret
});

// --------------------------------------------------------------------
// SET UP EXPRESS
// --------------------------------------------------------------------

// Parse application/json and application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Simple logger
app.use(function(req, res, next){
  console.log("%s %s", req.method, req.url);
  console.log(req.body);
  next();
});

// Error handler
app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

// Serve static files from directory
app.use(express.static(root));

// Basic protection on _servers content
app.get("/_servers", function(req, res) {
  res.send(404);
});

// Message proxy
app.post("/message", function(req, res) {
  // TODO: Check for valid POST data
  
  var socketId = req.body.socketId;
  var channel = req.body.channel;
  var message = req.body.message;

  pusher.trigger(channel, "message", message, socketId);

  res.send(200);
});

// Open server on specified port
console.log("Starting Express server");
app.listen(process.env.PORT || 5001);