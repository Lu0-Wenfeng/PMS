require("dotenv").config();
const express = require("express");
const db = require('./models');

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
