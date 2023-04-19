//Load modules
const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");

//Host
const PORT = process.env.PORT || 7000;
const hostname = "localhost";

//Multer
// TODO: Configure Filename to save mutliple files (and create a named folder by doing it?)
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
})

const upload = multer({ storage })

// Set static folder
app.use(express.static(path.join(__dirname,"public")));

//Init server on PORT
app.listen(PORT, () => console.log(`Server has started on ${hostname}:${PORT}.`));

//Handle Post Request
// TODO: convert blob into readable format (mp3?)
app.post("/upload", upload.any("file"), (req,res) => {
  console.log("uploaded file")
});
// app.get("/upload", (req,res) => {
//   res.send("Hello")
// });