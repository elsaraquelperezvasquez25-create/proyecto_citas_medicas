const db = require('../config/database');
const crypto = require('crypto');

const crearToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

const crearSesion = (usuarioId, rol, nombreUsuario, callback) => {
    const token = crearToken();

    const sql = `
        INSERT INTO sesion
        (token, usuario_id, rol, nombre_usuario)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [token, usuarioId, rol, nombreUsuario], function(err) {
        if (err) {
            return callback(err);
        }

        callback(null, token);
    });
};

const registrarAcceso = (dni, rol, nombreUsuario, especialidad = null) => {
    const sql = `
        INSERT INTO acceso_sistema
        (dni, rol, nombre_usuario, especialidad)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [dni, rol, nombreUsuario, especialidad], (err) => {
        if (err) {
            console.error('Error al registrar acceso:', err.message);
        }
    });
};

const responderLogin = (res, rol, usuario, token) => {
    return res.json({
        success: true,
        rol,
        usuario,
        token
    });
};

const login = (req, res) => {
    const { dni, password } = req.body;

    if (!dni || !password) {
        return res.status(400).json({
            success: false,
            message: 'Usuario/DNI y contraseña son obligatorios'
        });
    }

    const sqlAdmin = `
        SELECT
            id_admin AS id,
            usuario,
            nombre
        FROM administrador
        WHERE usuario = ? AND password = ?
    `;

    db.get(sqlAdmin, [dni, password], (err, admin) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }

        if (admin) {
            const nombreAdmin = admin.nombre;

            registrarAcceso(admin.usuario, 'admin', nombreAdmin);

            return crearSesion(admin.id, 'admin', nombreAdmin, (err, token) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                return responderLogin(res, 'admin', admin, token);
            });
        }

        const sqlDoctor = `
            SELECT 
                d.id_doctor AS id,
                d.dni,
                d.nombres,
                d.apellidos,
                d.correo,
                e.nombre AS especialidad
            FROM doctor d
            INNER JOIN especialidad e
                ON d.especialidad_id = e.id_especialidad
            WHERE d.dni = ? AND d.password = ?
        `;

        db.get(sqlDoctor, [dni, password], (err, doctor) => {
            if (err) {
                return res.status(500).json({ success: false, message: err.message });
            }

            if (doctor) {
                const nombreDoctor = doctor.nombres + ' ' + doctor.apellidos;

                registrarAcceso(
                    doctor.dni,
                    'doctor',
                    nombreDoctor,
                    doctor.especialidad
                );

                return crearSesion(doctor.id, 'doctor', nombreDoctor, (err, token) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    return responderLogin(res, 'doctor', doctor, token);
                });
            }

            const sqlPaciente = `
                SELECT 
                    id_paciente AS id,
                    dni,
                    nombres,
                    apellidos,
                    correo,
                    telefono,
                    direccion
                FROM paciente
                WHERE dni = ? AND password = ?
            `;

            db.get(sqlPaciente, [dni, password], (err, paciente) => {
                if (err) {
                    return res.status(500).json({ success: false, message: err.message });
                }

                if (paciente) {
                    const nombrePaciente = paciente.nombres + ' ' + paciente.apellidos;

                    registrarAcceso(
                        paciente.dni,
                        'paciente',
                        nombrePaciente
                    );

                    return crearSesion(paciente.id, 'paciente', nombrePaciente, (err, token) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        return responderLogin(res, 'paciente', paciente, token);
                    });
                }

                return res.status(401).json({
                    success: false,
                    message: 'Credenciales incorrectas'
                });
            });
        });
    });
};

module.exports = {
    login
};