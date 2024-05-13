const express = require('express');
const bookController = require('../../controllers/books');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas: validateSchemas } = require('../../models/book');

const router = express.Router();

router.get('/', authenticate, bookController.getAll);

router.get('/:id', authenticate, isValidId, bookController.getById);

router.post('/', authenticate, validateBody(validateSchemas.addSchema), bookController.add);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(validateSchemas.addSchema),
  bookController.updateById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(validateSchemas.updateFavoriteSchema),
  bookController.updateFavoriteById
);

router.delete('/:id', authenticate, isValidId, bookController.deleteById);

module.exports = router;
