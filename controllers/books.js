const bookModel = require('../models/books');
const { HttpError, controllerWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const result = await bookModel.listBooks();
  res.json(result);
};

const getById = async (req, res) => {
  const bookId = req.params.bookId;
  const result = await bookModel.getBookById(bookId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res) => {
  const result = await bookModel.addBook(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const bookId = req.params.bookId;
  const result = await bookModel.removeBookById(bookId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    message: 'Delete success',
  });
};

const updateById = async (req, res) => {
  const bookId = req.params.bookId;
  const result = await bookModel.updateBook(bookId, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  deleteById: controllerWrapper(deleteById),
  updateById: controllerWrapper(updateById),
};
