import { Router } from "express";
import * as all from "./author.controller.js";

const AuthorRouter=Router()
AuthorRouter.post('/',all.addauthor)//add a new author 
AuthorRouter.get('/',all.getauthors)//get all authors or filter by name or bio
AuthorRouter.get('/:id',all.getauthorbyid) //get author by id
AuthorRouter.patch('/:id',all.updateauthor)//can only update bio and books
AuthorRouter.delete('/:id',all.deleteauthor)//delete author 
export default AuthorRouter