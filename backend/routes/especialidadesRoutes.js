const express = require('express');
const router = express.Router();

const {
    listarEspecialidades
} = require('../controllers/especialidadesController');

router.get('/', listarEspecialidades);

module.exports = router;