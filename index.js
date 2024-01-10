import express from 'express'
import messageRouter from './src/modules/message.module/message.router.js'
import authRouter from './src/modules/auth/auth.router.js'
import { ConnectDB } from './DB/connection.js'
import userRouter from './src/modules/user/user.router.js'
const app = express()
const port = 3000
app.use(express.json())
ConnectDB();
app.use("/uploads",express.static("uploads"))
app.use("/user",userRouter)
app.use("/auth", authRouter)
app.use("/message", messageRouter)




app.all("*",(req,res,next)=>{
  return next(new Error("page not found"))
})



app.use((error, req, res, next) => {
  const statusCode = error.cause || 500;
  return res.status(statusCode).json({ success: false, message: error.message, stack: error.stack })
})



app.listen(port, () => {
  console.log(`server running success in port ${port}`)
})