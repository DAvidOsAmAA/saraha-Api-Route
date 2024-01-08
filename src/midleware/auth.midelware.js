import { Token } from "../../DB/models/token.model.js";
import Jwt from "jsonwebtoken";
import { asyncHandler } from "../utilis/asyncHandler.js";
import { User } from "../../DB/models/user.model.js";



export const authentication = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) {
    next(new Error(" token missing"), { cause: 400 })
  }
  if (!token.startsWith("Route__")) return next(new Error("invalid Token", { cause: 401 }))
  token = token.split("Route__")[1];
  const tokenDb = await Token.findOne({ token, isValid: false })
  if (tokenDb) return next(new Error(" token is expired ", { cause: 401 }))
  const payload = Jwt.verify(token, "secretKey");
  req.payload = payload;
  const isUser = User.findOne(payload.id);
  if(!isUser) {
    return next(new Error("user not found"))
  }
  next()
})



