-- ============================================================
-- MIGRACIÓN — Gestión de pacientes y notas clínicas
-- Dr. Rolando Vargas Calvetty
--
-- No rompe nada existente: citas.nombre_paciente y citas.telefono
-- se mantienen (compatibilidad con código actual), solo se agrega
-- paciente_id como vínculo opcional. Correr esto UNA vez sobre
-- la base de datos real en Neon.
-- ============================================================

-- 1) TABLA PACIENTES — identidad real del paciente, separada de cada cita
CREATE TABLE pacientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(150),
  notas_generales TEXT,              -- notas permanentes del paciente (alergias, antecedentes, etc.)
  creado_en TIMESTAMP DEFAULT NOW(),

  CONSTRAINT unique_telefono UNIQUE (telefono)  -- un teléfono = un paciente
);

CREATE INDEX idx_pacientes_nombre ON pacientes(nombre);
CREATE INDEX idx_pacientes_telefono ON pacientes(telefono);


-- 2) VINCULAR CITAS A PACIENTES
--    Se mantiene nombre_paciente/telefono en citas (no se borra nada),
--    solo se agrega la relación. Así el código actual sigue funcionando
--    sin cambios mientras se adopta el nuevo flujo.
ALTER TABLE citas ADD COLUMN paciente_id INTEGER REFERENCES pacientes(id);
CREATE INDEX idx_citas_paciente ON citas(paciente_id);


-- 3) MIGRAR CITAS EXISTENTES: crear un paciente por cada teléfono único
--    ya presente en citas, y vincular sus citas correspondientes.
INSERT INTO pacientes (nombre, telefono, email)
SELECT DISTINCT ON (telefono) nombre_paciente, telefono, email
FROM citas
ORDER BY telefono, creado_en DESC  -- si hay nombres distintos para el mismo teléfono, usa el más reciente
ON CONFLICT (telefono) DO NOTHING;

UPDATE citas c
SET paciente_id = p.id
FROM pacientes p
WHERE c.telefono = p.telefono AND c.paciente_id IS NULL;


-- 4) NOTAS CLÍNICAS — una o más notas por cita, escritas por el doctor
--    tras la consulta. Separado de citas para permitir varias notas
--    por cita si hace falta, y para no mezclar datos operativos
--    (fecha/hora/estado) con contenido clínico.
CREATE TABLE notas_clinicas (
  id SERIAL PRIMARY KEY,
  cita_id INTEGER NOT NULL REFERENCES citas(id) ON DELETE CASCADE,
  paciente_id INTEGER NOT NULL REFERENCES pacientes(id),
  contenido TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notas_cita ON notas_clinicas(cita_id);
CREATE INDEX idx_notas_paciente ON notas_clinicas(paciente_id);
