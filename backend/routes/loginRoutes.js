const express = require('express');

const router = express.Router();

const {
    login
} = require('../controllers/loginController');

const {
    validarLogin
} = require('../middleware/validationMiddleware');

router.post('/', validarLogin, login);

module.exports = router;