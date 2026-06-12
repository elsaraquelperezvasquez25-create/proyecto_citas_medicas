const db = require('../config/database');

const listarPacientes = (req, res) => {

    const sql = `
        SELECT
            id_paciente,
            dni,
            nombres,
            apellidos,
            telefono,
            correo
        FROM paciente
    `;

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
    listarPacientes
};