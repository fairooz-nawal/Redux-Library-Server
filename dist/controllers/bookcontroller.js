"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editBooks = exports.deleteBook = exports.createBook = exports.getAllBooks = void 0;
const library_1 = __importDefault(require("../model/library"));
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield library_1.default.find();
        res.status(200).json(books);
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});
exports.getAllBooks = getAllBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { serial_id, title, author, genre, isbn, copies, available } = req.body;
        const publishedDate = new Date();
        const newBook = new library_1.default({
            serial_id,
            title,
            author,
            genre,
            isbn,
            copies,
            available,
            publishedDate
        });
        const savedBook = yield newBook.save();
        res.status(201).json(savedBook);
    }
    catch (err) {
        res.status(400).json({ message: "Invalid data", error: err });
    }
});
exports.createBook = createBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedBook = yield library_1.default.deleteOne({ serial_id: id });
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});
exports.deleteBook = deleteBook;
const editBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, author, genre, isbn, copies } = req.body;
        // console.log(id);
        const updatedBorrow = yield library_1.default.findOneAndUpdate({ serial_id: Number(id) }, { $set: { title, author, genre, isbn, copies } }, { new: true });
        if (!updatedBorrow) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Book updated successfully",
            updatedBorrow
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});
exports.editBooks = editBooks;
