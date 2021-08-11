const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI || "mongodb://localhost/databasetest";

console.log(process.env.MONGODB_URI);

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("db connect");
});
