const db = require('../config/database');

const registrarPaciente = (req, res) => {

    const {
        dni,
        nombres,
        apellidos,
        fecha_nacimiento,
        sexo,
        telefono,
        correo,
        direccion,
        password
    } = req.body;

    if (!dni || !nombres || !apellidos || !correo || !password) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos obligatorios'
        });
    }

    const sqlVerificar = `
        SELECT dni
        FROM paciente
        WHERE dni = ?
    `;

    db.get(sqlVerificar, [dni], (err, existe) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (existe) {
            return res.status(409).json({
                success: false,
                message: 'El DNI ya está registrado'
            });
        }

        const sqlInsertar = `
            INSERT INTO paciente
            (
                dni,
                nombres,
                apellidos,
                fecha_nacimiento,
                sexo,
                telefono,
                correo,
                direccion,
                password
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(
            sqlInsertar,
            [
                dni,
                nombres,
                apellidos,
                fecha_nacimiento,
                sexo,
                telefono,
                correo,
                direccion,
                password
            ],
            function(err) {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                res.json({
                    success: true,
                    message: 'Paciente registrado correctamente',
                    id_paciente: this.lastID
                });

            }
        );

    });

};

module.exports = {
    registrarPaciente
};