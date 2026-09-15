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

// JSON-LD schema.org tipo Physician — datos reales confirmados solamente.
// NO incluye openingHours todavía: el horario en el sitio sigue siendo
// de ejemplo, y Google penaliza inconsistencia en datos estructurados
// una vez indexados. Agregar openingHours cuando el Dr. Vargas confirme
// el horario real.
export const JSON_LD_PHYSICIAN = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Rolando Vargas Calvetty',
  medicalSpecialty: ['Gynecology', 'Oncologic', 'Breast Medicine'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Parque Fidel Anze #200, Esq. Av. Pando, Edif. VyV NUR, Primer piso',
    addressLocality: 'Cochabamba',
    addressCountry: 'BO',
  },
  telephone: '+59170344225',
  url: 'https://drvargascalvetty.com', // actualizar cuando se compre el dominio final
  sameAs: ['https://www.facebook.com/ginecologocochabamba'],
  identifier: 'R.B.S.P.B. — San Pablo, Brasil',
};
