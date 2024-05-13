const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas: validateSchemas } = require('../../models/user');
const authController = require('../../controllers/auth');

const router = express.Router();

router.post('/register', validateBody(validateSchemas.registerSchema), authController.register);

router.get('/verify/:verificationCode', authController.verifyEmail);

router.post('/verify', validateBody(validateSchemas.emailSchema), authController.resendVerifyEmail);

router.post('/login', validateBody(validateSchemas.loginSchema), authController.login);

router.get('/current', authenticate, authController.getCurrent);

router.post('/logout', authenticate, authController.logout);

router.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

module.exports = router;
