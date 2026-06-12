const errorHandler = (err, req, res, next) => {
    console.error('Error detectado:', err.message);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
};

const rutaNoEncontrada = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
};

module.exports = {
    errorHandler,
    rutaNoEncontrada
};