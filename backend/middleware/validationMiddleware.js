const validarLogin = (req, res, next) => {
    const { dni, password } = req.body;

    if (!dni || !password) {
        return res.status(400).json({
            success: false,
            message: 'DNI/usuario y contraseña son obligatorios'
        });
    }

    if (password.length < 4) {
        return res.status(400).json({
            success: false,
            message: 'La contraseña debe tener mínimo 4 caracteres'
        });
    }

    next();
};

const validarRegistroPaciente = (req, res, next) => {
    const { dni, nombres, apellidos, correo, password } = req.body;

    if (!dni || !nombres || !apellidos || !correo || !password) {
        return res.status(400).json({
            success: false,
            message: 'Faltan datos obligatorios para registrar paciente'
        });
    }

    if (!/^\d{8}$/.test(dni)) {
        return res.status(400).json({
            success: false,
            message: 'El DNI debe tener 8 dígitos'
        });
    }

    if (!correo.includes('@')) {
        return res.status(400).json({
            success: false,
            message: 'Correo inválido'
        });
    }

    next();
};

module.exports = {
    validarLogin,
    validarRegistroPaciente
};