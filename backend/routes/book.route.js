const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

// Route: GET /api/books?type=isbn&query=9781787123427
router.get("/", bookController.getBooks);
//router for new arrivals
router.get('/new',bookController.getNewArrivals);
//router for trending book
router.get('/trending',bookController.getTrending);
module.exports = router;
