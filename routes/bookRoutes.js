const express = require("express");
const router = express.Router();

const { reserveBooks, deleteBook } = require("../controllers/bookController");

// Bug: Previously no structural issue here, but ensuring proper REST design
// Fix: Keeping correct HTTP methods
router.post("/books/reserve", reserveBooks);
router.delete("/books/:id", deleteBook);

module.exports = router;
