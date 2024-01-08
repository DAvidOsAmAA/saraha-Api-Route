import { Schema, model, Types } from "mongoose";


const messageSchema = new Schema({
  content: { type: String, required: true, min: 10, max: 100 },
  receivedId: { type: Types.ObjectId, ref: "User", required: true }
},{timestamps:true});

export const Message = model("Message",messageSchema)