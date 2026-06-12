const db = require('../config/database');

const verificarSesion = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token no enviado. Acceso denegado.'
        });
    }

    const sql = `
        SELECT *
        FROM sesion
        WHERE token = ? AND activa = 1
    `;

    db.get(sql, [token], (err, sesion) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (!sesion) {
            return res.status(401).json({
                success: false,
                message: 'Token inválido o sesión inactiva.'
            });
        }

        req.sesion = sesion;
        next();
    });
};

const autorizarRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.sesion) {
            return res.status(401).json({
                success: false,
                message: 'No hay sesión activa'
            });
        }

        if (!rolesPermitidos.includes(req.sesion.rol)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permisos para acceder a esta ruta'
            });
        }

        next();
    };
};

module.exports = {
    verificarSesion,
    autorizarRoles
};