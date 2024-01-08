import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 60 },
  isConfirmed: { type: Boolean, default: false },
  forgetCode: { type: String, unique: true },
  profilePic: String
}, {
  timestamps: true
})


export const User = model("User", userSchema)