const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  publisher: String,
  publishedDate: String,
  description: String,
  pageCount: Number,
  categories: [String],
  averageRating: Number,
  thumbnail: String,
  isbn: { type: String, unique: true, required: false },
  searchCount: { type: Number, default: 0 },

  // Library-specific fields
  totalCopies: { type: Number, default: 1 },
  copiesAvailable: { type: Number, default: 1 },
  borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
