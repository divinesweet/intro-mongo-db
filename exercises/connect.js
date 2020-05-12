const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//const url = "mongodb://localhost:27017whatever";

const connect = (url) =>
  mongoose.connect(url, {
    useNewUrlParser: true,
  });

module.exports = connect;
