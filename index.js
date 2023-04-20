const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/routes/route")
// const multer = require('multer');
const app = express();
app.use(express.json());
// app.use(multer().any())
mongoose
  .connect(
    "mongodb+srv://ankushrai222:Ankushrai222@newproject.tknxizt.mongodb.net/insuredMine-Assingment",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is Connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, () => {
  console.log("Server running on port  ",  3000);
});
