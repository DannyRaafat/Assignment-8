import { Console, error, log } from "console";
import mongoose from "mongoose";

export const dbConnection=mongoose.connect('mongodb://localhost:27017/assignment8').then(()=>{
    console.log(("database connected successfully"));
}).catch((err)=>{
    console.log({ message: error.message });
})