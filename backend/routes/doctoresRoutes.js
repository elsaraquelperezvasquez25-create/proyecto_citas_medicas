const express = require('express');

const router = express.Router();

const {
    listarDoctores
} = require('../controllers/doctoresController');

router.get('/', listarDoctores);

module.exports = router;