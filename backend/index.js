require("dotenv").config();
const express = require("express");

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
