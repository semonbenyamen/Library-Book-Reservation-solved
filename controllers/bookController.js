const Book = require("../models/Book");

const reserveBooks = async (req, res) => {
  try {
   const { bookIds } = req.body;
   if (!bookIds || !Array.isArray(bookIds)) {
    return res.status(400).json({ msg: "Invalid book IDs"});
   }
   let reservedCount = 0;

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

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
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
