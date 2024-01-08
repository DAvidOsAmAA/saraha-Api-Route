import jwt from 'jsonwebtoken';
import { User } from "../../../DB/models/user.model.js";
import bcryptjs from "bcryptjs"
import { sendEmail } from '../../utilis/sendEmail.js';
import randomstring from 'randomstring'
import { Token } from '../../../DB/models/token.model.js';



export const signUp = async (req, res, next) => {
  const { userName, email, password, age, confirmPassword } = req.body;

  const hashPassword = bcryptjs.hashSync(req.body.password)
  const user = await User.create({ ...req.body, password: hashPassword })

  const token = jwt.sign({ email: user.email }, "secretKey")

  const messageSend = await sendEmail({
    to: user.email, subject: "account activation",
    html: `<a href='http://localhost:3000/auth/active_account/${token}'> Activate your account </a>`
  })

  if (!messageSend) return next(new Error("email is in valid", { cause: 400 }))
  res.json({ success: true, message: "user created successfully", result: user, message: messageSend })
}


export const logIn = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return next(new Error("user not found", { cause: 404 }))
  console.log("User.isConfirmed:", User.isConfirmed);  
if (!user.isConfirmed) return next(new Error("you should activate your account first"))
  const match = bcryptjs.compare(req.body.password, user.password)
  if (!match) return next(new Error("password is invalid", { cause: 400 }))
  const token = jwt.sign({ id: user._id, email: user.email }, "secretKey")
  res.json({ success: true, message: "logIn successfully", token: { token } })
}

export const activeAccount = async (req, res, next) => {
  const { token } = req.params
  const payload = jwt.verify(token, "secretKey");
  const user = await User.findOneAndUpdate(
    { email: payload.email },
    { isConfirmed: true },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, message: "Account activated successfully", user });
}


export const sendForgetCode = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) next(new Error("user not found"))
  if (!user.isConfirmed) return next(new Error("you must activate your account first"))
  const code = randomstring.generate({
    length: 5,
    charset: "numberic"
  })
  user.forgetCode = code;
  await user.save()

  const messageSend = await sendEmail({
    to: user.email,
    subject: "Reset password",
    html: `<div>${code}</div>`
  })
  if (!messageSend) return next(new Error("Email is invalid"))
  res.json({ message: `message you can reset password` })
}


export const resetPassword = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (!user) return next(new Error("user not found"))
  if (user.forgetCode !== req.body.code) {
    return next(new Error("Invalid code"))
  }
  user.password = bcryptjs.hashSync(req.body.password, 8)
  await user.save()
  const token = await Token.find({ user: user._id })
  token.forEach(async(token)=>{
    token.isValid = false;
    await token.save()
  })
  return res.json({success:true,message:"try to login now"})
}