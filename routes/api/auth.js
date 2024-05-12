const express = require('express');
const { validateBody } = require('../../middlewares');
const { schemas: validateSchemas } = require('../../models/user');
const authController = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validateBody(validateSchemas.registerSchema), authController.register);

router.post('/login', validateBody(validateSchemas.loginSchema), authController.login);

module.exports = router;
