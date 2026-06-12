const db = require('../config/database');

const crearHistorial = (req, res) => {
    const { cita_id, diagnostico, tratamiento, observaciones } = req.body;

    const sql = `
        INSERT INTO historial_medico
        (cita_id, diagnostico, tratamiento, observaciones)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [cita_id, diagnostico, tratamiento, observaciones], function(err) {
        if (err) return res.status(500).json({ success: false, error: err.message });

        res.json({
            success: true,
            id_historial: this.lastID
        });
    });
};

const listarHistorialPorPaciente = (req, res) => {
    const pacienteId = req.params.id;

    const sql = `
        SELECT
            h.id_historial,
            h.diagnostico,
            h.tratamiento,
            h.observaciones,
            h.fecha,
            c.id_cita,
            c.fecha AS fecha_cita,
            c.hora,
            d.nombres || ' ' || d.apellidos AS doctor,
            e.nombre AS especialidad
        FROM historial_medico h
        INNER JOIN cita c ON h.cita_id = c.id_cita
        INNER JOIN doctor d ON c.doctor_id = d.id_doctor
        INNER JOIN especialidad e ON d.especialidad_id = e.id_especialidad
        WHERE c.paciente_id = ?
        ORDER BY h.fecha DESC
    `;

    db.all(sql, [pacienteId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json(rows);
    });
};

module.exports = {
    crearHistorial,
    listarHistorialPorPaciente
};