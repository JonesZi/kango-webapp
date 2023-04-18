const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
// const hostname = "192.168.56.1"
const path = require("path");
const cors = require("cors");
app.use(cors());

// Set static folder

app.use(express.static((path.join(__dirname,"public"))));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));