import { Router } from "express";
import { uploadFile } from "../../utilis/muilter.js";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import { profilePic } from "./user.controller.js";
import { authentication } from "../../midleware/auth.midelware.js";
const router = Router()

router.post("/profile_pic",authentication,uploadFile().single("pp"),asyncHandler(profilePic))
export default router;