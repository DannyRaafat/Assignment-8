import { Book } from "../../../database/models/book.model.js";
import { Author } from "../../../database/models/author.model.js";
import mongoose from "mongoose";
const addbook = async (req, res) => {
    const { title, content, author } = req.body
    if (!title || !content || !author) {
        res.status(400).json({ message: 'Wrong Data' })
    }
    else {
        try {
            const book = await Book.insertMany(req.body)
            res.status(201).json({ message: "Book is added successfully", book });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

}
const getbooks = async (req, res) => {
    try {
        if (req.query.author) {
            req.query.author = req.query.author.toLowerCase();
            const Books = await Book.find({ author: req.query.author })
            res.status(200).json({ Books });
        }
        else if (req.query.title) {
            req.query.title = req.query.title.toLowerCase();
            const Books = await Book.find({ title: req.query.title })
            res.status(200).json({ Books });
        }
        else {
            const page = parseInt(req.query.page) || 1;
            const limit = 10
            const skip = (page - 1) * limit;
            const Books = await Book.find().skip(skip).limit(limit);

            const totalbooks = await Book.countDocuments();

            const totalPages = Math.ceil(totalbooks / limit);
            if (page > totalPages) {
                res.status(404).json("can't find this page");
            }
            else {
                res.status(200).json({ Books, currentPage: page, totalPages });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getbookbyid = async (req, res) => {
    try {
        if (req.params.id.length != 24) {
            return res.status(400).send({ message: `invalid id` });
        }
        else {
            const Books = await Book.findById(req.params.id)
            if (!Books) {
                res.status(404).json("no Book with this id");
            }
            else {
                res.status(201).json({ Books });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updatebook = async (req, res) => {
    try {
        const { author, ...rest } = req.body;
        if (req.params.id.length != 24) {
            return res.status(400).send({ message: `invalid id` });
        }
        else {
            const Books = await Book.findByIdAndUpdate(req.params.id, rest, { new: true });
            if (!Books) {
                res.status(404).json("no Book with this id");
            }
            else {
                if(author){
                    var message="Cannot Update The Author Name"
                }
                return res.status(200).send({ Books ,message });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deletebook = async (req, res) => {
    try {
        if (req.params.id.length != 24) {
            return res.status(400).send({ message: `invalid id` });
        }
        else {
            var Books = await Book.findByIdAndDelete(req.params.id);
            if (!Books) {
                res.status(404).json("No Book with this id");
            }
            else {
                const bookObjectId = new mongoose.Types.ObjectId(Books._id);
                await Author.findOneAndUpdate( {name:Books.author},{ $pull: { books: bookObjectId } });
                return res.status(200).send({ Books });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export {
    addbook,
    getbooks,
    getbookbyid,
    updatebook,
    deletebook
}