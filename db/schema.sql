-- Esquema Neon — Dr. Rolando Vargas Calvetty
-- Ginecólogo - Oncólogo - Mastólogo

CREATE TABLE horarios_disponibles (
  id SERIAL PRIMARY KEY,
  dia_semana INT NOT NULL,           -- 0=domingo ... 6=sábado
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  duracion_cita INT DEFAULT 30,      -- minutos
  activo BOOLEAN DEFAULT true
);

CREATE TABLE citas (
  id SERIAL PRIMARY KEY,
  nombre_paciente VARCHAR(150) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(150),
  tipo_consulta VARCHAR(50) NOT NULL, -- 'ginecologia' | 'oncologia_mastologia' | 'control_prenatal' | 'segunda_opinion' | 'otro'
  primera_vez BOOLEAN DEFAULT true,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  estado VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente' | 'confirmada' | 'cancelada' | 'completada'
  notificado_whatsapp BOOLEAN DEFAULT false,
  notificado_email BOOLEAN DEFAULT false,
  creado_en TIMESTAMP DEFAULT NOW(),

  CONSTRAINT unique_horario UNIQUE (fecha, hora)  -- evita doble booking en el mismo slot
);

CREATE TABLE bloqueos (
  id SERIAL PRIMARY KEY,
  fecha DATE NOT NULL,
  motivo VARCHAR(200)
);

-- Índices para las queries más frecuentes (disponibilidad y panel admin)
CREATE INDEX idx_citas_fecha ON citas(fecha);
CREATE INDEX idx_citas_estado ON citas(estado);
CREATE INDEX idx_bloqueos_fecha ON bloqueos(fecha);
