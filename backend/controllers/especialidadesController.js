const db = require('../config/database');

const listarEspecialidades = (req, res) => {
    const sql = 'SELECT * FROM especialidad';

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
};

module.exports = {
    listarEspecialidades
};