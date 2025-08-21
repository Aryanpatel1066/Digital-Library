const fetchBooks = require("../utils/googleBooks");
const Book = require("../models/book.model");
//based on seach book controller
exports.getBooks = async (req, res) => {
  const { type, query } = req.query;
  if (!type || !query) {
    return res.status(400).json({ error: "Missing type or query" });
  }

  try {
    let results = [];

    // 1. If search by ISBN, check local DB first
    if (type === "isbn") {
      const existing = await Book.findOne({ isbn: query });
      if (existing) {
        // ✅ increment search count here
        existing.searchCount = (existing.searchCount || 0) + 1;
        await existing.save();

        return res.json([existing]);
      }
    }

    // 2. Always fetch from Google Books API
    const googleBooks = await fetchBooks(type, query);

    // 3. Return results immediately
    res.json(googleBooks);

    // 4. Save/update in DB in background
    googleBooks.forEach(async (gb) => {
      if (!gb.isbn) return; // skip books without ISBN

      const existing = await Book.findOne({ isbn: gb.isbn });

      if (existing) {
        // increment search count only once
        existing.searchCount = (existing.searchCount || 0) + 1;
        await existing.save();
      } else {
        const newBook = new Book({ ...gb, searchCount: 1 });
        await newBook.save();
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//new arrival book controller
exports.getNewArrivals = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(10);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
//trending book controller
exports.getTrending = async (req, res) => {
  try {
    const books = await Book.find().sort({ searchCount: -1 }).limit(10);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//fetch particular book by id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  }
  catch (err) {
    console.log(err);
    res.status(500).send({
      message: "error while fetching particulr book"
    })
  }
}