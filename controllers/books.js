const { Book } = require('../models/book');
const { HttpError, controllerWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Book.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate(
    'owner',
    'name email'
  );
  res.json(result);
};

const getById = async (req, res) => {
  const bookId = req.params.id;
  const result = await Book.findById(bookId);
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Book.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const bookId = req.params.id;
  const result = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const bookId = req.params.id;
  const result = await Book.findByIdAndUpdate(bookId, req.body, { new: true });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const bookId = req.params.id;
  const result = await Book.findByIdAndDelete(bookId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  updateFavoriteById: controllerWrapper(updateFavoriteById),
  deleteById: controllerWrapper(deleteById),
};
