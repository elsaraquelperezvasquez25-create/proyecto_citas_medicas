const express = require('express');
const router = express.Router();

const {
    crearReceta,
    listarRecetasPorPaciente
} = require('../controllers/recetasController');

router.post('/', crearReceta);
router.get('/paciente/:id', listarRecetasPorPaciente);

module.exports = router;