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
    <div>
      <div className="mb-4 flex items-center justify-between">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-alt text-lg leading-none text-teal-light transition-colors hover:bg-teal/20"
          onClick={() => cambiarMes(-1)}
          aria-label="Mes anterior"
        >
          ‹
        </button>
        <span className="font-serif text-base text-paper">
          {MESES[mesActual]} {anioActual}
        </span>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-alt text-lg leading-none text-teal-light transition-colors hover:bg-teal/20"
          onClick={() => cambiarMes(1)}
          aria-label="Mes siguiente"
        >
          ›
        </button>
      </div>

      <div className="mb-1.5 grid grid-cols-7 gap-1.5">
        {DIAS.map((d, i) => (
          <span key={i} className="text-center text-xs text-muted">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {diasDelMes.map((d, i) => {
          if (d === null) return <span key={i} className="aspect-square" />;
          const iso = toISO(anioActual, mesActual, d);
          const esPasado = iso < hoyISO;
          const noDisponible = fechasNoDisponibles.includes(iso);
          const deshabilitado = esPasado || noDisponible;
          const seleccionado = iso === fechaSeleccionada;

          return (
            <button
              key={i}
              className={
                'aspect-square rounded text-sm transition-colors ' +
                (seleccionado
                  ? 'bg-copper font-semibold text-[#23140A]'
                  : deshabilitado
                    ? 'cursor-not-allowed bg-bg-alt text-line'
                    : 'bg-bg-alt text-paper hover:bg-teal/30')
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
