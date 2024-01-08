import { Router } from "express";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import { authentication } from "../../midleware/auth.midelware.js";
import { validation } from "../../midleware/validation.midleware.js";
import { getAllMessages, sendMessage } from "./message.controller.js";
import { sendMessageSchema } from "./sendMessageSchema.js";
const router = Router()




router.post("/addMessage",authentication,validation(sendMessageSchema),asyncHandler(sendMessage))

router.get("/getAllMessages",authentication,asyncHandler(getAllMessages))



export default router