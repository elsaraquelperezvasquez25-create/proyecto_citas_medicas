const express = require('express');
const router = express.Router();

const {
    crearPago,
    listarPagosPorPaciente
} = require('../controllers/pagosController');

router.post('/', crearPago);
router.get('/paciente/:id', listarPagosPorPaciente);

module.exports = router;