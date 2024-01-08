import { Message } from "../../../DB/models/message.model.js"
import { User } from "../../../DB/models/user.model.js"



export const sendMessage = async (req, res, next) => {
  const user = await User.findById(req.body.receivedId)
  if (!user) return next(new Error("receivedId not found", { cause: 404 }))
  const createdMessage = await Message.create(req.body);
  return res.json({ success: true, message: "message send successfully", result: createdMessage })
}

export const getAllMessages = async (req, res, next) => {
  const getAllMessage = await Message.findOne({ receivedId: req.payload.id });
  return res.json({ success: true, result: getAllMessage })
}