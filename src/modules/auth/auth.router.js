import { Router } from "express";
import { asyncHandler } from "../../utilis/asyncHandler.js";
import { logIn, signUp, activeAccount, sendForgetCode, resetPassword } from "./auth.controller.js";
import { validation } from "../../midleware/validation.midleware.js";
import { activateSchema, forgetSchema, logInSchema, resetPasswordSchema, signUpSchema } from "./auth.schema.js";

const router = Router();

router.post("/signUp",validation(signUpSchema),asyncHandler(signUp))

router.post("/logIn",validation(logInSchema),asyncHandler(logIn))

router.get("/active_account/:token",validation(activateSchema),asyncHandler(activeAccount))

router.patch("/forget_code",validation(forgetSchema),asyncHandler(sendForgetCode))

router.patch("/reset_password",validation(resetPasswordSchema),asyncHandler(resetPassword))

export default router;