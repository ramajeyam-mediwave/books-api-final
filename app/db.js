const { v4: uuidv4 } = require("uuid");
const { isValidISBN } = require("./Validation/ISBN_validation");

const books = [
  {
    id: 4040,
    title: "kaithi",
    isbn: "007462542X",
  },
];

const booksRatings = [
  {
    id: 100,
    rating: 3,
    bookId: 1234,
  },
];

const getAllBooks = () => books;
const addBook = ({ title, isbn }) => {
  if (isValidISBN(isbn)) {
    const id = uuidv4();
    const b = {
      id,
      title,
      isbn,
    };
    books.push(b);
    return b;
  } else console.log("Invalid");
};

const addRating = ({ rating, bookId }) => {
  const ratingId = uuidv4();

  const bookRating = {
    id: ratingId,
    rating,
    bookId,
  };
  booksRatings.push(bookRating);
  return bookRating;
};
const getBookById = (id) => {
  const book = books.find((b) => b.id == id);

  if (!book) {
    return null;
  }

  const ratingEntry = booksRatings.find((b) => b.bookId == id);

  const rating = ratingEntry ? ratingEntry.rating : 0;

  b = {
    id: book.id,
    title: book.title,
    isbn: book.isbn,
    rating: rating,
  };
  return b;
};
const editBookById = ({ id, title }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx != -1) {
    books[idx]["title"] = title;
    return books[idx];
  }
  return null;
};
const deleteBookById = (id) => {
  const idx = books.findIndex((b) => b.id == id);
  const ratingidx = booksRatings.findIndex((b) => b.bookId == id);
  if (idx == -1) {
    return null;
  }
  const b = books[idx];
  books.splice(idx, 1);
  if (ratingidx !== -1) {
    const r = booksRatings[ratingidx];
    booksRatings.splice(ratingidx, 1);
    return {
      b,
      r,
    };
  }
  return b;
};

const updateRating = ({ rating, bookId }) => {
  const idx = booksRatings.findIndex((b) => b.bookId == bookId);
  if (idx != -1) {
    booksRatings[idx]["rating"] = rating;
    return booksRatings[idx];
  }
  return null;
};

const getRatingById = (id) => {
  const rating = booksRatings.find((r) => r.id == id);
  if (!rating) {
    return null;
  }
  const book = books.find((b) => b.id == rating.bookId);
  return {
    id: rating.id,
    rating: rating.rating,
    book,
  };
};
const deleteRatingById = (id) => {
  const idx = booksRatings.findIndex((r) => r.id == id);
  if (idx == -1) {
    return null;
  }
  const deletedRating = booksRatings[idx];
  booksRatings.splice(idx, 1);
  return deletedRating;
};
module.exports = {
  getAllBooks,
  addBook,
  addRating,
  getBookById,
  editBookById,
  deleteBookById,
  updateRating,
  getRatingById,
  deleteRatingById,
};
