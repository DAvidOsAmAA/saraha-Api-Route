import { User } from "../../../DB/models/user.model.js"

export const profilePic = async (req, res, next) => {
  const id =req.payload.id
  const user = await User.findByIdAndUpdate(id, { profilePic: req.file.path })
  return res.json({ success: true, message : "profile picture add successfully"})
}