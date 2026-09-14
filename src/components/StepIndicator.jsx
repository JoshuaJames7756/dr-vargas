export default function StepIndicator({ pasoActual }) {
  const pasos = [
    { n: 1, label: 'Fecha y hora' },
    { n: 2, label: 'Tus datos' },
    { n: 3, label: 'Confirmación' },
  ];

  return (
    <div className="mb-12 flex items-start">
      {pasos.map((p, i) => (
        <div className="flex flex-1 flex-col items-center" key={p.n}>
          <div className="flex w-full items-center">
            <span
              className={
                'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 bg-bg text-[13px] font-semibold transition-colors ' +
                (pasoActual === p.n
                  ? 'border-copper text-copper'
                  : pasoActual > p.n
                    ? 'border-copper bg-copper text-[#23140A]'
                    : 'border-line text-muted')
              }
            >
              {pasoActual > p.n ? '✓' : p.n}
            </span>
            {i < pasos.length - 1 && (
              <span
                className={
                  'h-0.5 flex-1 transition-colors ' +
                  (pasoActual > p.n ? 'bg-copper' : 'bg-line')
                }
              />
            )}
          </div>
          <span
            className={
              'mt-2 text-xs ' +
              (pasoActual === p.n ? 'font-semibold text-copper' : 'text-muted')
            }
          >
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
