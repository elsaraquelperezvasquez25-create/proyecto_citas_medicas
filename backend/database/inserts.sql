-- =========================
-- ESPECIALIDADES
-- =========================

INSERT INTO especialidad (nombre, descripcion) VALUES
('Medicina General', 'Atención médica integral');

INSERT INTO especialidad (nombre, descripcion) VALUES
('Cardiología', 'Enfermedades del corazón');

INSERT INTO especialidad (nombre, descripcion) VALUES
('Pediatría', 'Atención infantil');

INSERT INTO especialidad (nombre, descripcion) VALUES
('Dermatología', 'Enfermedades de la piel');

INSERT INTO especialidad (nombre, descripcion) VALUES
('Neurología', 'Sistema nervioso');

-- =========================
-- DOCTORES
-- =========================

INSERT INTO doctor
(dni, nombres, apellidos, correo, telefono, especialidad_id, password)
VALUES
('70000001','Juan','Pérez','jperez@medicare.com','999111111',2,'123456');

INSERT INTO doctor
(dni, nombres, apellidos, correo, telefono, especialidad_id, password)
VALUES
('70000002','Carlos','Gómez','cgomez@medicare.com','999222222',3,'123456');

INSERT INTO doctor
(dni, nombres, apellidos, correo, telefono, especialidad_id, password)
VALUES
('70000003','Ana','Torres','atorres@medicare.com','999333333',4,'123456');

-- =========================
-- PACIENTES
-- =========================

INSERT INTO paciente
(dni, nombres, apellidos, fecha_nacimiento, sexo, telefono, correo, direccion, password)
VALUES
('80000001','Elsa','Pérez','2000-05-10','F','987654321','elsa@gmail.com','Lima','123456');

INSERT INTO paciente
(dni, nombres, apellidos, fecha_nacimiento, sexo, telefono, correo, direccion, password)
VALUES
('80000002','Nayu','Valencia','1998-08-20','F','987111222','nayu@gmail.com','Lima','123456');