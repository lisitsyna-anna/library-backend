const fs = require('fs/promises');
const path = require('path');
const uniqid = require('uniqid');

const booksPath = path.join(__dirname, 'books.json');

const listBooks = async () => {
  const books = await fs.readFile(booksPath);
  return JSON.parse(books);
};

const getBookById = async bookId => {
  const books = await listBooks();
  const bookById = books.find(({ id }) => id === bookId);

  return bookById || null;
};

const removeBookById = async bookId => {
  const books = await listBooks();
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return null;
  }

  const [removedBook] = books.splice(bookIndex, 1);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return removedBook;
};

const addBook = async body => {
  const books = await listBooks();

  const newBook = {
    id: uniqid(),
    ...body,
  };
  books.push(newBook);
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

  return newBook;
};

const updateBook = async (bookId, body) => {
  const books = await listBooks();
  const findedIndex = books.findIndex(book => book.id === bookId);
  if (findedIndex === -1) {
    return null;
  }

  books[findedIndex] = { id: bookId, ...body };

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[findedIndex];
};

module.exports = {
  listBooks,
  getBookById,
  removeBookById,
  addBook,
  updateBook,
};
