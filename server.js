//Load modules
const express = require("express");
const path = require("path");
const multer = require("multer");
const exphbs = require("express-handlebars");

//Initialize app
const app = express();

//Setup Handlebars view engine
app.set("views", path.join(__dirname,"views"));
app.engine("handlebars", exphbs.engine({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Define Host
const PORT = process.env.PORT || 8000;
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
// app.use(express.static(path.join(__dirname,"public")));

//Set routes for handlebars views
app.get("/", (req,res) => {
  res.render("home");
})

//Handle Post Request
app.post("/upload", upload.any("file"), (req,res) => {
  console.log("uploaded file")
});
// app.get("/upload", (req,res) => {
//   res.send("Hello")
// });


//Init server on PORT
app.listen(PORT, () => console.log(`Server has started on ${hostname}:${PORT}.`));
