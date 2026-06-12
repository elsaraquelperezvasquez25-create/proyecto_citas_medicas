const express = require('express');

const router = express.Router();

const {
    registrarPaciente
} = require('../controllers/registroController');

const {
    validarRegistroPaciente
} = require('../middleware/validationMiddleware');

router.post('/', validarRegistroPaciente, registrarPaciente);

module.exports = router;