import joi from "joi";
import { Types } from "mongoose";
import { objectIdValidation } from "../../midleware/validation.midleware.js";



export const sendMessageSchema = joi.object({
  content: joi.string().min(10).max(100).required(),
  receivedId: joi.custom(objectIdValidation).required()
}).required()