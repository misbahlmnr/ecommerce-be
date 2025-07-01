const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/", async (req, res) => {
  res.status(200).send("API using express.js");
});
app.use("/api", require("./routes"));

// NOTE: uncomment this if you want to use in development
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
