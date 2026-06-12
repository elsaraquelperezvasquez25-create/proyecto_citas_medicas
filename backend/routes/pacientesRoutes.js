const express = require('express');

const router = express.Router();

const {
    listarPacientes
} = require('../controllers/pacientesController');

router.get('/', listarPacientes);

module.exports = router;