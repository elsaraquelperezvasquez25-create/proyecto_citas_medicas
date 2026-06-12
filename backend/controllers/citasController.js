const db = require('../config/database');

const listarCitas = (req, res) => {
    const sql = `
        SELECT
            c.id_cita,
            c.fecha,
            c.hora,
            c.motivo,
            c.estado,
            c.fecha_creacion,
            p.id_paciente,
            p.nombres || ' ' || p.apellidos AS paciente,
            d.id_doctor,
            d.nombres || ' ' || d.apellidos AS doctor,
            e.nombre AS especialidad
        FROM cita c
        INNER JOIN paciente p ON c.paciente_id = p.id_paciente
        INNER JOIN doctor d ON c.doctor_id = d.id_doctor
        INNER JOIN especialidad e ON d.especialidad_id = e.id_especialidad
        ORDER BY c.fecha DESC, c.hora DESC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const crearCita = (req, res) => {
    const { paciente_id, doctor_id, fecha, hora, motivo } = req.body;

    const sql = `
        INSERT INTO cita (paciente_id, doctor_id, fecha, hora, motivo)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [paciente_id, doctor_id, fecha, hora, motivo], function(err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            success: true,
            id_cita: this.lastID,
            message: 'Cita registrada correctamente'
        });
    });
};

const listarCitasPorPaciente = (req, res) => {
    const pacienteId = req.params.id;

    const sql = `
        SELECT
            c.id_cita,
            c.fecha,
            c.hora,
            c.estado,
            c.motivo,
            d.nombres || ' ' || d.apellidos AS doctor,
            e.nombre AS especialidad
        FROM cita c
        INNER JOIN doctor d ON c.doctor_id = d.id_doctor
        INNER JOIN especialidad e ON d.especialidad_id = e.id_especialidad
        WHERE c.paciente_id = ?
        ORDER BY c.fecha DESC
    `;

    db.all(sql, [pacienteId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const listarCitasPorDoctor = (req, res) => {
    const doctorId = req.params.id;

    const sql = `
        SELECT
            c.id_cita,
            c.fecha,
            c.hora,
            c.estado,
            c.motivo,
            p.nombres || ' ' || p.apellidos AS paciente
        FROM cita c
        INNER JOIN paciente p ON c.paciente_id = p.id_paciente
        WHERE c.doctor_id = ?
        ORDER BY c.fecha DESC
    `;

    db.all(sql, [doctorId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

module.exports = {
    listarCitas,
    crearCita,
    listarCitasPorPaciente,
    listarCitasPorDoctor
};