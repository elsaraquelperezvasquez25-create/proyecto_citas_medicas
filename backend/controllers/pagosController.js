const db = require('../config/database');

const PagoFactory = require('../../patterns/pagosFactory');

const crearPago = (req, res) => {
    const { cita_id, monto, metodo_pago } = req.body;

    let pagoProcesado;

    try {
        const pago = PagoFactory.crearPago(metodo_pago);
        pagoProcesado = pago.procesar(monto);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    const sql = `
        INSERT INTO pago
        (cita_id, monto, metodo_pago, estado)
        VALUES (?, ?, ?, 'Pagado')
    `;

    db.run(sql, [cita_id, pagoProcesado.monto, pagoProcesado.metodo_pago], function(err) {
        if (err) return res.status(500).json({ success: false, error: err.message });

        res.json({
            success: true,
            id_pago: this.lastID,
            message: 'Pago registrado correctamente'
        });
    });
};

const listarPagosPorPaciente = (req, res) => {
    const pacienteId = req.params.id;

    const sql = `
        SELECT
            pg.id_pago,
            pg.monto,
            pg.metodo_pago,
            pg.fecha_pago,
            pg.estado,
            c.id_cita,
            c.fecha AS fecha_cita,
            c.hora,
            d.nombres || ' ' || d.apellidos AS doctor,
            e.nombre AS especialidad
        FROM pago pg
        INNER JOIN cita c ON pg.cita_id = c.id_cita
        INNER JOIN doctor d ON c.doctor_id = d.id_doctor
        INNER JOIN especialidad e ON d.especialidad_id = e.id_especialidad
        WHERE c.paciente_id = ?
        ORDER BY pg.fecha_pago DESC
    `;

    db.all(sql, [pacienteId], (err, rows) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        res.json(rows);
    });
};

module.exports = {
    crearPago,
    listarPagosPorPaciente
};