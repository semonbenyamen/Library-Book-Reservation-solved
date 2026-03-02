const Book = require("../models/Book");

// Reserve Multiple Books
const reserveBooks = async (req, res) => {
  try {
   const { bookIds } = req.body;

    // Bug: No validation for bookIds input
    // Fix: Added validation to ensure it's an array
   if (!bookIds || !Array.isArray(bookIds)) {
    return res.status(400).json({ msg: "Invalid book IDs"});
   }
    // Bug: reservedCount was previously declared as const
    // Fix: Changed to let to allow increment
   let reservedCount = 0;

    // Bug: Used forEach with async (does not wait for await)
    // Fix: Replaced with for...of loop to properly await database operations
   for (const id of bookIds) {
    const book = await Book.findById(id);

    if (book && book.isAvailable) {
      book.isAvailable = false;
      await book.save();
      reservedCount++;
    }
   }
   return res.status(200).json({
    msg: "Books reserved successfully",
    count: reservedCount,
   });
  } catch (erro) {
    console.log("Error reserving books", error);
    return res.status(500).json({ msg: "Error reserving books" });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Bug: Used deprecated findByIdAndRemove
    // Fix: Replaced with findByIdAndDelete
      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ msg: "Book not found" });
      }
    return res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Error deleting book" });
  }
};

module.exports = { reserveBooks, deleteBook };
