import mongoose, { Schema, model } from "mongoose";
import { type } from "os";

const schema = new Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthdate: { type: Date },
    books:[{ type: mongoose.Types.ObjectId,ref:'Book'}]
    
},{
    versionKey:false
})
export const Author=model("Author",schema)