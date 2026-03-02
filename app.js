require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Library Server Running "));



