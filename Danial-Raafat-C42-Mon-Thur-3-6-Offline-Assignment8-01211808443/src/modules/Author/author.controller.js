import e, { query } from "express";
import { Author } from "../../../database/models/author.model.js";
import { Book } from "../../../database/models/book.model.js";

const addauthor = async (req, res) => {
    const { name, books } = req.body
    if (!name || !books) {
        res.status(400).json({ message: 'Wrong Data' })
    }
    else {
        try {
            for (const id of req.body.books) {
                if (id.length != 24) {
                    return res.status(400).send({ message: `invalid id` });
                }
                const book = await Book.findById(id);
                if (!book ) {
                    return res.status(404).send({ message: `Book ${id} not found ` });
                }
                else if (name!=book.author ){
                    return res.status(404).send({ message: `the author on the book is not the same` });
                }
                }
            const author = await Author.insertMany(req.body)
            res.status(201).json({ message: "Author is added successfully", author });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}
const getauthors = async (req, res) => {
    try {
        if(req.query.name){
            req.query.name=req.query.name.toLowerCase();
            const authors = await Author.find({name:req.query.name}).populate({path: "books",select: "title content -_id"})
            res.status(200).json({ authors});
        }
        else if(req.query.bio){
            req.query.bio=req.query.bio.toLowerCase();
            const authors = await Author.find({bio:req.query.bio}).populate({path: "books",select: "title content -_id"})
            res.status(200).json({ authors });
        }
        else{
        const page = parseInt(req.query.page) || 1;
        const limit = 10
        const skip = (page - 1) * limit;
        const authors = await Author.find().populate({path: "books",select: "title content -_id"}).skip(skip).limit(limit);

        const totalAuthors = await Author.countDocuments();

        const totalPages = Math.ceil(totalAuthors / limit);
        if (page > totalPages) {
            res.status(404).json("can't find this page");
        }
        else {
            res.status(200).json({ authors, currentPage: page, totalPages });
        }
    } }catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getauthorbyid = async (req, res) => {
    try {
        if (req.params.id.length != 24) {
            return res.status(400).send({ message: `invalid id` });
        }
        else {
            const author = await Author.findById(req.params.id).populate("books");
            if (!author) {
                res.status(404).json("no Author with this id");
            }
            else {
                res.status(201).json({ author });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateauthor = async (req, res) => {
    try {
        const { books, bio } = req.body;
        if (req.params.id.length != 24) {
            return res.status(400).send({ message: `invalid id` });
        }
        else {
            const author = await Author.findByIdAndUpdate(req.params.id,{ $set: { bio: bio } },  { new: true });
            if (!author) {
                res.status(404).json("no Author with this id");
            }
            else {
                if (books) {
                    for (const id of req.body.books) {
                        if (id.length != 24) {
                            return res.status(400).send({ message: `invalid id` });
                        }
                        const book = await Book.findById(id);
                        if (!book) {
                            return res.status(400).send({ message: `Book ${id} not found` });
                        }
                        else if (author.name!=book.author ){
                            return res.status(404).send({ message: `the author on the book is not the same` });
                        }
                        else {
                            author.books.push(id)
                        }
                    }
                    await author.save()

                }
                return res.status(200).send({ author });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteauthor = async (req, res) => {
    try {
        if (req.params.id.length != 24) {
            return res.status(400).send({ message: `invalid id` });
        }
        else {
            const author = await Author.findByIdAndDelete(req.params.id)
            if (!author) {
                res.status(404).json("no Author with this id");
            }
            else {
                res.status(201).json("Author deleted");
            }
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export {
    addauthor,
    getauthors,
    getauthorbyid,
    updateauthor,
    deleteauthor
}