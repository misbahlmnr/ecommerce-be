const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
require("module-alias/register");
const cors = require("cors");

const app = express();
const port = 2000;

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
