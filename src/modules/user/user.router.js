import { Router } from "express";
import { fileValidation, uploadFile } from "../../utilis/muilter.js";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import { coverPics, profilePic, updateProfilePic } from "./user.controller.js";
import { authentication } from "../../midleware/auth.midelware.js";
import { uploadFileCloud } from "../../utilis/muilterCloud.js";
const router = Router()


fileValidation
//////file system ///////
// router.post("/profile_pic", authentication, uploadFile({ folder: "users/profilePics", filter: fileValidation.images }).single("pp"), asyncHandler(profilePic));
// router.post("/cover_pic", authentication, uploadFile({ folder: "users/coverPics" }).array("coverPics", 3), asyncHandler(coverPics))
////////cloudinary//////////
router.post("/profile_pic", authentication, uploadFileCloud({  filter: fileValidation.images }).single("pp"), asyncHandler(profilePic));
router.post("/cover_pic", authentication, uploadFileCloud().array("coverPics", 3), asyncHandler(coverPics))
router.patch("/profile_pic", authentication, uploadFileCloud({  filter: fileValidation.images }).single("pp"), asyncHandler(updateProfilePic));

export default router;