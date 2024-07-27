import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors"
const app = express();

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("I love WUWA");
});

//middleware for parsing req body
app.use(express.json());

//Middleware for CORS
//Allow all
app.use(cors())
//allow custom
//app.use(cors({
//origin,methods,dan alowedHeaders}))

//route save buku baru
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// route display all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//route for get one book from id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

//Route for update book
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid book ID" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book updated successfuly!" });
  } catch (err) {
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});

//route for delete
app.delete("/books/:id", async (req, res) => {
  try {
    // Your logic to delete a book will go here
    const { id } = req.params;

    // Check if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid book ID" });
    }
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book deleted successfuly!" });
  } catch (err) {
    // Your error handling logic will go here
    console.log(err.message);
    response.status(500).send({ message: err.message });
  }
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log("APP listen to port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
