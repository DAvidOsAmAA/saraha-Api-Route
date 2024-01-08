import joi from "joi"
export const signUpSchema = joi.object({
  email: joi.string().email().required(),
  age: joi.number().min(18).max(60),
  userName: joi.string().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmPassword: joi.string().valid(joi.ref("password")).required()
}).required()



export const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).required()


export const activateSchema = joi.object({
  token: joi.string().required(),
}).required()


export const forgetSchema = joi.object({
  email: joi.string().email().required()
}).required()

export const resetPasswordSchema = joi.object({
  email:joi.string().email().required(),
  code: joi.string().length(5).required(),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmedPassword: joi.string().valid(joi.ref("password")).required(),
}).required()