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


//Multer for saving Blob files on the server
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

//Set variables
let update = false;

//Set routes for handlebars views
app.get("/", (req,res) => {
  res.render("home", { update });
})

//Handle Post Request
app.post("/upload", upload.any("file"), (req,res) => {
  console.log("uploaded file")
});

app.post('/update-status', (req, res) => {
  // Perform the logic to update the status variable on the server
  // For example, you can toggle its value between true and false
  if (update === false) {
    update = true;
  } else {
    update = false;
  };

  // Respond with a JSON indicating the status update was successful
  res.json({ message: `Status updated successfully to ${update}`});
});



//Init server on PORT
app.listen(PORT, () => console.log(`Server has started on ${hostname}:${PORT}.`));
