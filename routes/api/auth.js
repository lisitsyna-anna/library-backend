const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas: validateSchemas } = require('../../models/user');
const authController = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validateBody(validateSchemas.registerSchema), authController.register);

router.post('/login', validateBody(validateSchemas.loginSchema), authController.login);

router.get('/current', authenticate, authController.getCurrent);

router.post('/logout', authenticate, authController.logout);

module.exports = router;
