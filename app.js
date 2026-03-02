require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

// Bug: express.urlencoded() was missing configuration
// Fix: Added { extended: true } to properly parse form data
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

// Bug: No error handling for DB connection
// Fix: Wrapped connection inside try/catch block
const connectDB = async () => {
  try {
  await mongoose.connect(process.env.DB_URL);
  console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Failed", error);
    process.exit(1);
  }
};
connectDB();

app.use("/api", bookRoutes);

// Bug: Port was hardcoded
// Fix: Using environment variable with fallback
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Library Server Running "));



