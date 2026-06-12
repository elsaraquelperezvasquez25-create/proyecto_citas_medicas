const express = require('express');
const router = express.Router();

const {
    listarCitas,
    crearCita,
    listarCitasPorPaciente,
    listarCitasPorDoctor
} = require('../controllers/citasController');

router.get('/', listarCitas);
router.post('/', crearCita);
router.get('/paciente/:id', listarCitasPorPaciente);
router.get('/doctor/:id', listarCitasPorDoctor);

module.exports = router;