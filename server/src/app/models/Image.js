import mongoose from "mongoose";
import { User } from "./User.js";

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    api: {
      type: String,
      required: true,
    },
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", ImageSchema);
