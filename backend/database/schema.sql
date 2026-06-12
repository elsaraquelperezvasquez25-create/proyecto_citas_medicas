PRAGMA foreign_keys = ON;

-- =========================
-- TABLA ESPECIALIDAD
-- =========================
CREATE TABLE especialidad (
    id_especialidad INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
);

-- =========================
-- TABLA DOCTOR
-- =========================
CREATE TABLE doctor (
    id_doctor INTEGER PRIMARY KEY AUTOINCREMENT,
    dni TEXT NOT NULL UNIQUE,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    correo TEXT NOT NULL,
    telefono TEXT,
    especialidad_id INTEGER NOT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (especialidad_id)
        REFERENCES especialidad(id_especialidad)
);

-- =========================
-- TABLA PACIENTE
-- =========================
CREATE TABLE paciente (
    id_paciente INTEGER PRIMARY KEY AUTOINCREMENT,
    dni TEXT NOT NULL UNIQUE,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fecha_nacimiento DATE,
    sexo TEXT,
    telefono TEXT,
    correo TEXT NOT NULL,
    direccion TEXT,
    password TEXT NOT NULL
);

-- =========================
-- TABLA CITA
-- =========================
CREATE TABLE cita (
    id_cita INTEGER PRIMARY KEY AUTOINCREMENT,
    paciente_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT,
    estado TEXT NOT NULL DEFAULT 'Pendiente',
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (paciente_id)
        REFERENCES paciente(id_paciente),

    FOREIGN KEY (doctor_id)
        REFERENCES doctor(id_doctor)
);

-- =========================
-- TABLA HISTORIAL MEDICO
-- =========================
CREATE TABLE historial_medico (
    id_historial INTEGER PRIMARY KEY AUTOINCREMENT,
    cita_id INTEGER NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (cita_id)
        REFERENCES cita(id_cita)
);

-- =========================
-- TABLA RECETA
-- =========================
CREATE TABLE receta (
    id_receta INTEGER PRIMARY KEY AUTOINCREMENT,
    historial_id INTEGER NOT NULL,
    medicamentos TEXT NOT NULL,
    indicaciones TEXT NOT NULL,

    FOREIGN KEY (historial_id)
        REFERENCES historial_medico(id_historial)
);

-- =========================
-- TABLA PAGO
-- =========================
CREATE TABLE pago (
    id_pago INTEGER PRIMARY KEY AUTOINCREMENT,
    cita_id INTEGER NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    metodo_pago TEXT NOT NULL,
    fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado TEXT DEFAULT 'Pagado',

    FOREIGN KEY (cita_id)
        REFERENCES cita(id_cita)
);