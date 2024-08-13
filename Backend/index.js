require("dotenv").config();

const app = require("./app");

const { connectToDatabase } = require("./db/db.js");

const listenForRequests = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Now listening on port", port);
  });
};

connectToDatabase().then(() => {
  listenForRequests();
});
