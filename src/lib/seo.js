// Metadatos SEO por ruta. Cada página importa su entrada desde aquí
// y la pasa al componente <Seo />. Centralizado para que sea fácil
// ajustar títulos/descripciones sin tocar cada página individualmente.

export const SEO = {
  inicio: {
    title: 'Dr. Rolando Vargas Calvetty — Ginecólogo Oncólogo en Cochabamba',
    description:
      'Consultorio del Dr. Rolando Vargas Calvetty, Ginecólogo, Oncólogo y Mastólogo en Cochabamba, Bolivia. Agenda tu cita en línea.',
  },
  sobreElDoctor: {
    title: 'Sobre el Dr. Vargas — Ginecólogo Oncólogo Cochabamba',
    description:
      'Conoce la formación, especialización y enfoque de atención del Dr. Rolando Vargas Calvetty, registro profesional R.B.S.P.B. San Pablo, Brasil.',
  },
  ginecologia: {
    title: 'Ginecólogo en Cochabamba — Control Prenatal, Papanicolau | Dr. Vargas',
    description:
      'Servicios de ginecología en Cochabamba: control prenatal, colposcopia, Papanicolau, planificación familiar, climaterio y menopausia. Dr. Rolando Vargas Calvetty.',
  },
  oncologia: {
    title: 'Oncólogo y Mastólogo en Cochabamba — Dr. Rolando Vargas',
    description:
      'Diagnóstico y tratamiento oncológico y mastológico en Cochabamba: quimioterapia, hormonoterapia, terapia molecular y medicina paliativa. Dr. Rolando Vargas Calvetty.',
  },
  agendarCita: {
    title: 'Agendar Cita — Dr. Rolando Vargas Calvetty',
    description:
      'Reserva tu consulta con el Dr. Rolando Vargas Calvetty en Cochabamba. Elige fecha y hora disponible en línea, confirmación inmediata.',
  },
  contenido: {
    title: 'Contenido Educativo — Dr. Rolando Vargas Calvetty',
    description:
      'Publicaciones educativas sobre salud ginecológica y oncológica del Dr. Rolando Vargas Calvetty, Ginecólogo Oncólogo en Cochabamba.',
  },
  contacto: {
    title: 'Contacto — Dr. Rolando Vargas Calvetty | Cochabamba',
    description:
      'Dirección, teléfono y WhatsApp del consultorio del Dr. Rolando Vargas Calvetty en Parque Fidel Anze, Cochabamba, Bolivia.',
  },
};

// Nota: el JSON-LD schema.org Physician vive como <script> estático
// en index.html (no aquí), para que los crawlers lo lean sin depender
// de que React se monte primero. Si necesitas editarlo, edita index.html.
