import { Router } from "express";
import * as all from "./book.controller.js";


const BookRouter=Router()
BookRouter.post("/",all.addbook)//add a new book 
BookRouter.get("/",all.getbooks)//get all book or filter by title or author
BookRouter.get("/:id",all.getbookbyid)//get book by id
BookRouter.patch("/:id",all.updatebook)//can only update title ,content and publishedDate
BookRouter.delete("/:id",all.deletebook)//delete book 
export default BookRouter