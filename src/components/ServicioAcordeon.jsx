export default function ServicioAcordeon({ servicio, abierto, onToggle }) {
  const panelId = `servicio-panel-${servicio.nombre.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="border-t border-line last:border-b">
      <button
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-teal-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-light"
        onClick={onToggle}
        aria-expanded={abierto}
        aria-controls={panelId}
      >
        <span className="font-serif text-[19px] font-medium leading-snug">
          {servicio.nombre}
        </span>
        <span className="flex-shrink-0 font-serif text-xl italic text-teal-light">
          {abierto ? '−' : '+'}
        </span>
      </button>
      {abierto && (
        <div id={panelId} className="reveal visible pb-6 pr-10">
          <p className="max-w-[56ch] text-[15px] leading-relaxed text-muted">
            {servicio.descripcion}
          </p>
        </div>
      )}
    </div>
  );
}
