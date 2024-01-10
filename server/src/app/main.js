import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

import { titleCase } from "../utils/stringUtils.js";
import { User, Image } from "./models/index.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URI)
  .then(() => {
    console.log("DB connection succeeded");
  })
  .catch((err) => {
    console.log('"DB connection error');
  });

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use("/static", express.static(path.join(path.resolve(), "public")));

const port = process.env.PORT;

// Handle file uploads -------------
const MEDIA_DESTINATION_PATH = "public/uploads";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, MEDIA_DESTINATION_PATH),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const handleUpload = multer({ storage: storage }).single("avatar");

// Routes -------------
app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.post("/register", handleUpload, async (req, res, next) => {
  let firstName = req.body.firstName?.trim();
  let lastName = req.body.lastName?.trim();
  let email = req.body.email?.trim();
  const file = req.file;

  if (!firstName || !lastName || !email || !file) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  firstName = titleCase(req.body.firstName);
  lastName = titleCase(req.body.lastName);
  email = req.body.email.trim().toLowerCase();

  const session = await mongoose.connection.startSession();

  try {
    session.startTransaction();
    const userModel = new User({ firstName, lastName, email });
    const user = await userModel.save();

    const imageModel = new Image({
      name: file.filename,
      path: file.path,
      api: `${req.protocol}://${req.hostname}:${port}/static/uploads/${file.filename}`,
      owner: user,
    });
    const image = await imageModel.save();

    await session.commitTransaction();

    return res.status(201).json({
      message: "Saved successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatarUrl: image.api,
      },
    });
  } catch (e) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Error while saving data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
