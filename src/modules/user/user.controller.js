import { User } from "../../../DB/models/user.model.js"
import cloudinary from "../../utilis/cloud.js"
//////////// file system //////////////////////
// export const profilePic = async (req, res, next) => {
//   const id =req.payload.id
//   const user = await User.findByIdAndUpdate(id, { profilePic: req.file.path })
//   return res.json({ success: true, message : "profile picture add successfully"})
// }

// export const coverPics = async (req,res,next) =>{
//   const id = req.payload.id
//   const user = await User.findById(id)
//   req.files.forEach((file)=>{
//     user.coverPics.push(file.path)
//   })
//   await user.save()
//   res.json({success:true,message:"uploads cover photos successfully",result:req.files})
// }
export const profilePic = async (req, res, next) => {
  const id = req.payload.id
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    folder: `user/${id}/profilePics`
  })

  const user = await User.findByIdAndUpdate(id, { profilePic: { secure_url, public_id } })

  return res.json({ success: true, message: "profile picture add successfully" })
}

export const coverPics = async (req, res, next) => {
  const id = req.payload.id
  const user = await User.findById(id)
  for (let index = 0; index < req.files.length; index++) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files[index].path,
      {
        folder: `user/${id}/coverPics`
      })
    user.coverPics.push({ secure_url, public_id })
  }
  await user.save()
  res.json({ success: true, message: "uploads cover photos successfully", result: req.files })
}


export const updateProfilePic = async (req, res, next) => {
  const  id  = req.payload.id;
  const user = await User.findById(id);
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
    public_id: user.profilePic.public_id
  })
  user.profilePic = { secure_url, public_id }
  await User.save()
  return res.json({success:true,message:"profile picture updated successfully"})
}