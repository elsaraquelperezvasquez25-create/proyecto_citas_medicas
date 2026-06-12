const db = require('../config/database');

const crearReceta = (req, res) => {
    const { historial_id, medicamentos, indicaciones } = req.body;

    const sql = `
        INSERT INTO receta
        (historial_id, medicamentos, indicaciones)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [historial_id, medicamentos, indicaciones], function(err) {
        if (err) return res.status(500).json({ success: false, error: err.message });

        res.json({
            success: true,
            id_receta: this.lastID,
            message: 'Receta registrada correctamente'
        });
    });
};

const listarRecetasPorPaciente = (req, res) => {
    const pacienteId = req.params.id;

    const sql = `
        SELECT
            r.id_receta,
            r.medicamentos,
            r.indicaciones,
            h.diagnostico,
            h.fecha,
            c.fecha AS fecha_cita,
            d.nombres || ' ' || d.apellidos AS doctor
        FROM receta r
        INNER JOIN historial_medico h ON r.historial_id = h.id_historial
        INNER JOIN cita c ON h.cita_id = c.id_cita
        INNER JOIN doctor d ON c.doctor_id = d.id_doctor
        WHERE c.paciente_id = ?
        ORDER BY h.fecha DESC
    `;

    db.all(sql, [pacienteId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

module.exports = {
    crearReceta,
    listarRecetasPorPaciente
};