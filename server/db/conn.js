const mongoose = require("mongoose");
const DB = process.env.DATABASE || "mongodb+srv://user:lepg4XDj2v@cluster0.4pgnj8w.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log("connection unsuccessful" + e);
  });
