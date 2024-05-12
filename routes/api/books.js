const express = require('express');
const bookController = require('../../controllers/books');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas: validateSchemas } = require('../../models/book');

const router = express.Router();

router.get('/', bookController.getAll);

router.get('/:id', isValidId, bookController.getById);

router.post('/', validateBody(validateSchemas.addSchema), bookController.add);

router.put('/:id', isValidId, validateBody(validateSchemas.addSchema), bookController.updateById);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(validateSchemas.updateFavoriteSchema),
  bookController.updateFavoriteById
);

router.delete('/:id', isValidId, bookController.deleteById);

module.exports = router;
