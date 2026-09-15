export default function StepIndicator({ pasoActual }) {
  const pasos = [
    { n: 1, label: 'Fecha y hora' },
    { n: 2, label: 'Tus datos' },
    { n: 3, label: 'Confirmación' },
  ];

  const pasoClamp = Math.min(Math.max(pasoActual, 1), pasos.length);
  const progresoPct = ((pasoClamp - 1) / (pasos.length - 1)) * 100;

  return (
    <div className="mb-14">
      <div className="flex items-start">
        {pasos.map((p, i) => {
          const activo = pasoActual === p.n;
          const completado = pasoActual > p.n;
          const esUltimo = i === pasos.length - 1;

          return (
            <div key={p.n} className={'flex items-center' + (esUltimo ? '' : ' flex-1')}>
              <div className="flex flex-col items-center">
                <span
                  className={
                    'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 bg-bg text-[13px] font-semibold transition-all duration-300 ' +
                    (activo
                      ? 'scale-110 border-copper text-copper shadow-[0_0_0_4px_rgba(201,123,74,0.15)]'
                      : completado
                        ? 'border-copper bg-copper text-[#23140A]'
                        : 'border-line text-muted')
                  }
                >
                  {completado ? '✓' : p.n}
                </span>
                <span
                  className={
                    'mt-3 whitespace-nowrap text-[12.5px] transition-colors ' +
                    (activo ? 'font-semibold text-copper' : completado ? 'text-paper' : 'text-muted')
                  }
                >
                  {p.label}
                </span>
              </div>

              {!esUltimo && (
                <div className="relative mx-3 h-px flex-1 self-start" style={{ top: '20px' }}>
                  <div className="absolute inset-0 bg-line" />
                  <div
                    className="absolute inset-y-0 left-0 bg-copper transition-all duration-500 ease-out"
                    style={{ width: pasoActual > p.n ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
