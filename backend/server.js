const express = require('express');
const cors = require('cors');

const db = require('./config/database');

const {
    Especialidad,
    GrupoEspecialidades
} = require('../patterns/especialidadesComposite');

const especialidadesRoutes = require('./routes/especialidadesRoutes');
const doctoresRoutes = require('./routes/doctoresRoutes');
const pacientesRoutes = require('./routes/pacientesRoutes');
const loginRoutes = require('./routes/loginRoutes');
const citasRoutes = require('./routes/citasRoutes');
const registroRoutes = require('./routes/registroRoutes');
const historialRoutes = require('./routes/historialRoutes');
const recetasRoutes = require('./routes/recetasRoutes');
const pagosRoutes = require('./routes/pagosRoutes');

const { errorHandler, rutaNoEncontrada } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/especialidades', especialidadesRoutes);
app.use('/api/doctores', doctoresRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/registro', registroRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/recetas', recetasRoutes);
app.use('/api/pagos', pagosRoutes);

const { verificarSesion, autorizarRoles } = require('./middleware/authMiddleware');

app.get('/api/protegido', verificarSesion, (req, res) => {
    res.json({
        success: true,
        mensaje: 'Acceso permitido',
        sesion: req.sesion
    });
});

app.get('/api/admin-only', verificarSesion, autorizarRoles('admin'), (req, res) => {
    res.json({
        success: true,
        mensaje: 'Acceso permitido solo para administrador',
        sesion: req.sesion
    });
});

app.get('/api/composite-test', (req, res) => {
    const medicina = new GrupoEspecialidades('Área Médica');

    medicina.agregar(new Especialidad('Medicina General'));
    medicina.agregar(new Especialidad('Cardiología'));
    medicina.agregar(new Especialidad('Neurología'));

    const saludMental = new GrupoEspecialidades('Salud Mental');

    saludMental.agregar(new Especialidad('Psicología'));
    saludMental.agregar(new Especialidad('Psiquiatría'));

    res.json({
        success: true,
        grupos: [
            medicina.mostrar(),
            saludMental.mostrar()
        ]
    });
});

const {
    PagoBase,
    DescuentoDecorator,
    RecargoDecorator
} = require('../patterns/pagosDecorator');

app.get('/api/decorator-test', (req, res) => {

    let pago = new PagoBase(100);

    pago = new DescuentoDecorator(pago);
    pago = new RecargoDecorator(pago);

    res.json({
        descripcion: pago.getDescripcion(),
        monto_final: pago.getMonto()
    });

});

// Ruta principal
app.get('/', (req, res) => {
    res.send('Servidor Medicare Plus funcionando');
});

app.use(rutaNoEncontrada);
app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});