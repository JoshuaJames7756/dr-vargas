import { useState, useMemo } from 'react';

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

function toISO(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export default function CalendarioDisponibilidad({ fechaSeleccionada, onSeleccionarFecha, fechasNoDisponibles = [] }) {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(hoy.getMonth());
  const [anioActual, setAnioActual] = useState(hoy.getFullYear());

  const diasDelMes = useMemo(() => {
    const primerDia = new Date(anioActual, mesActual, 1).getDay();
    const totalDias = new Date(anioActual, mesActual + 1, 0).getDate();
    const celdas = [];
    for (let i = 0; i < primerDia; i++) celdas.push(null);
    for (let d = 1; d <= totalDias; d++) celdas.push(d);
    return celdas;
  }, [mesActual, anioActual]);

  const hoyISO = toISO(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

  function cambiarMes(delta) {
    let m = mesActual + delta;
    let a = anioActual;
    if (m < 0) { m = 11; a -= 1; }
    if (m > 11) { m = 0; a += 1; }
    setMesActual(m);
    setAnioActual(a);
  }

  return (
    <div className="calendario">
      <div className="calendario__header">
        <button className="calendario__nav" onClick={() => cambiarMes(-1)} aria-label="Mes anterior">‹</button>
        <span className="calendario__mes">{MESES[mesActual]} {anioActual}</span>
        <button className="calendario__nav" onClick={() => cambiarMes(1)} aria-label="Mes siguiente">›</button>
      </div>

      <div className="calendario__grid calendario__grid--dias">
        {DIAS.map((d, i) => <span key={i} className="calendario__dia-label">{d}</span>)}
      </div>

      <div className="calendario__grid">
        {diasDelMes.map((d, i) => {
          if (d === null) return <span key={i} className="calendario__celda calendario__celda--vacia" />;
          const iso = toISO(anioActual, mesActual, d);
          const esPasado = iso < hoyISO;
          const noDisponible = fechasNoDisponibles.includes(iso);
          const deshabilitado = esPasado || noDisponible;
          const seleccionado = iso === fechaSeleccionada;

          return (
            <button
              key={i}
              className={
                'calendario__celda' +
                (seleccionado ? ' is-selected' : '') +
                (deshabilitado ? ' is-disabled' : '')
              }
              disabled={deshabilitado}
              onClick={() => onSeleccionarFecha(iso)}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
