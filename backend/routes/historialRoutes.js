const express = require('express');
const router = express.Router();

const {
    crearHistorial,
    listarHistorialPorPaciente
} = require('../controllers/historialController');

router.post('/', crearHistorial);
router.get('/paciente/:id', listarHistorialPorPaciente);

module.exports = router;