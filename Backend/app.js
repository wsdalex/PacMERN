const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routes/users.js");
const authenticationRouter = require("./routes/authentication");
const tokenChecker = require("./middleware/tokenChecker");
const friendsRouter = require("./routes/friends.js");
const messageRouter = require("./routes/message.js");
//Create express app, enable cors and ability to read json
const app = express();
app.use(cors());
app.use(bodyParser.json());

// root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PACMERN" });
});

//ROUTES TO GO HERE
app.use("/users", usersRouter);
app.use("/tokens", authenticationRouter);
app.use("/friends", friendsRouter);
app.use("/messages", messageRouter);

// Simulate an error route for testing error handling
app.get("/error", () => {
  throw new Error("Test error");
});

//404 handling
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

//Error Handling
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong" });
  }
});

module.exports = app;
