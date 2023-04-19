const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 7000;
const hostname = "localhost";

// Set static folder
app.use(express.static(path.join(__dirname,"public")));

//Init server on PORT
app.listen(PORT, () => console.log(`Server has started on ${hostname}:${PORT}.`));
