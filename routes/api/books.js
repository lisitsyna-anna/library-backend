const express = require('express');
const bookController = require('../../controllers/books');
const { validateBody } = require('../../middlewares');
const validateSchemas = require('../../schemas/books');

const router = express.Router();

router.get('/', bookController.getAll);

router.get('/:bookId', bookController.getById);

router.post('/', validateBody(validateSchemas.addSchema), bookController.add);

router.delete('/:bookId', bookController.deleteById);

router.put('/:bookId', validateBody(validateSchemas.addSchema), bookController.updateById);

module.exports = router;
