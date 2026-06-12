const db = require('../config/database');

const listarDoctores = (req, res) => {

    const sql = `
        SELECT
            d.id_doctor,
            d.dni,
            d.nombres,
            d.apellidos,
            e.nombre AS especialidad
        FROM doctor d
        INNER JOIN especialidad e
        ON d.especialidad_id = e.id_especialidad
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
    listarDoctores
};