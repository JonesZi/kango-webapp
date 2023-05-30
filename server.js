//Load modules
const express = require("express");
const path = require("path");
const multer = require("multer");
const exphbs = require("express-handlebars");
const fs = require("fs");

//Initialize app
const app = express();

//Middleware to parse JSON bodies
app.use(express.json());

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
  res.render("home");
});

app.get("/admin", (req,res) => {
  res.render("admin");
});

//Handle Post Request
//Handle uploads
app.post("/upload", upload.any("file"), (req,res) => {
  console.log("uploaded file")
});

//Validate Name
app.post("/validate", (req,res) => {
  const { name } = req.body;

  fs.readFile("./data/names.json", "utf8", (err,data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error reading Json file"});
    }

    try {
      const names = JSON.parse(data);
      if (names.includes(name)) {
        return res.status(400).json({ message: "Name already exists, please choose another name!"})
      } else {
        names.push(name);
        fs.writeFile("./data/names.json", JSON.stringify(names), (err) => {
          if (err) {
            console.error(err);
            return res.status(500),json({ message: "Server error writing to Json file"})
          }

          return res.json({status: "ok", link: "/success"});
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: "Server error"});
    }
  });
});

// Delete user list
app.post("/deleteUsers", (req,res) => {
  const empytNames = [];
  fs.writeFile("./data/names.json", JSON.stringify(empytNames), (err) => {
    if (err) {
      console.error(err);
      return res.status(500),json({ message: "Server error writing to Json file"})
    }

    return res.json({status: "ok", message: "Userlist reset"});
    });
  });


//Init server on PORT
app.listen(PORT, () => console.log(`Server has started on ${hostname}:${PORT}.`));
