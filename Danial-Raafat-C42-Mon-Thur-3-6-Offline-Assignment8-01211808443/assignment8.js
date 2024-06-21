import express from'express'
import { dbConnection } from './database/dbConnection.js'
import BookRouter from './src/modules/Book/book.routes.js'
import AuthorRouter from './src/modules/Author/author.routes.js'

const app=express()
const port=3000

app.use(express.json())
app.use('/book',BookRouter)
app.use('/author',AuthorRouter)

//https://documenter.getpostman.com/view/35029632/2sA3XV8z3Z

app.listen(port,()=>console.log("server is running"))