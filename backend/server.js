const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const categoryRoutes = require("./src/routes/category.js");
const { connectDb } = require("./src/db/db.js");
const cloudinary = require("cloudinary").v2;
const hospitalRoutes = require("./src/routes/hospital.js");

const cors = require("cors");

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/categories", categoryRoutes);
app.use("/api/hospitals", hospitalRoutes);
connectDb();
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
