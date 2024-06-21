import { Schema, model } from "mongoose";

const schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author:{ type: String, required: true},
    publishedDate: { type: Date, default: new Date }
},{
    versionKey:false
})
export const Book=model("Book",schema)