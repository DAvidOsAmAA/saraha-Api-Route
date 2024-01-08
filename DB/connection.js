import mongoose from 'mongoose'


export const ConnectDB = async ()=>{
 return await mongoose
 .connect("mongodb://127.0.0.1:27017/sara7aApp")
 .then(()=>{console.log("Db connected")})
 .catch((error)=> console.log(error))
}