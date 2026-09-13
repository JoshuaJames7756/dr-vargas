import { useState } from 'react';

export default function ServicioAcordeon({ servicio, abierto, onToggle }) {
  return (
    <div className={'servicio' + (abierto ? ' is-abierto' : '')}>
      <button className="servicio__cabecera" onClick={onToggle} aria-expanded={abierto}>
        <span className="servicio__nombre">{servicio.nombre}</span>
        <span className="servicio__toggle">{abierto ? '−' : '+'}</span>
      </button>
      {abierto && (
        <div className="servicio__contenido">
          <p>{servicio.descripcion}</p>
        </div>
      )}
    </div>
  );
}
