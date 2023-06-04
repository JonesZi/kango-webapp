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

app.get("/categories", (req,res) => {
  fs.readFile("./data/categories.json", "utf-8", (err,data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error reading Json file"})
    };
    try {
      const categories = JSON.parse(data);
      res.render("categories", {"categories": categories});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error"});
    };
  });
});

app.get("/:id", (req,res) => {
  const pageID = parseInt(req.params.id);
  const index = pageID - 1;
  let data;
  fs.readFile("./data/categories.json", "utf-8", (err,data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error reading Json file"})
    };
    try {
      const categories = JSON.parse(data);
      data = categories[index];
      res.render("category", {"category": data});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error"});
    };
  });  
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

          return res.json({status: "ok", link: "/categories"});
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
  const emptyNames = [];
  fs.writeFile("./data/names.json", JSON.stringify(emptyNames), (err) => {
    if (err) {
      console.error(err);
      return res.status(500),json({ message: "Server error writing to Json file"})
    }

    return res.json({status: "ok", message: "Userlist reset"});
    });
  });

//Remove Category
app.post("/removeCategory", (req,res) => {
  const { objectId } = req.body;
  console.log(req.body);
  
  fs.readFile("./data/categories.json", "utf8", (err,data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error reading Json file"});
    }

    try {
      const categories = JSON.parse(data);
      const objectIndex = categories.findIndex(obj => obj.id === objectId);
      
      if (objectIndex !== -1) {
        // Remove the object from the array
        const poppedObject = categories.splice(objectIndex, 1)[0];
        //overwrite file
        fs.writeFile("./data/categories.json", JSON.stringify(categories), (err) => {
          if (err) {
            console.error(err);
            return res.status(500),json({ message: "Server error writing to Json file"})
          }
        });
        res.json({ status: 'ok', message: 'Object popped successfully', poppedObject });
      } else {
        res.status(404).json({ status: 'error', message: 'Object not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: "Server error"});
    }
  });
})


//Init server on PORT
app.listen(PORT, () => console.log(`Server has started on ${hostname}:${PORT}.`));
