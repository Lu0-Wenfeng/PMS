require("dotenv").config();
const cors = require("cors");
const express = require("express");
const router = require("./routes/auth");
const mongoose = require("mongoose");

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router);

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("About to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("err:", err.message);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
