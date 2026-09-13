export default function StepIndicator({ pasoActual }) {
  const pasos = [
    { n: 1, label: 'Fecha y hora' },
    { n: 2, label: 'Tus datos' },
    { n: 3, label: 'Confirmación' },
  ];

  return (
    <div className="step-indicator">
      {pasos.map((p, i) => (
        <div className="step-indicator__item" key={p.n}>
          <div className="step-indicator__row">
            <span
              className={
                'step-indicator__circle' +
                (pasoActual === p.n ? ' is-active' : '') +
                (pasoActual > p.n ? ' is-done' : '')
              }
            >
              {pasoActual > p.n ? '✓' : p.n}
            </span>
            {i < pasos.length - 1 && (
              <span className={'step-indicator__line' + (pasoActual > p.n ? ' is-done' : '')} />
            )}
          </div>
          <span className={'step-indicator__label' + (pasoActual === p.n ? ' is-active' : '')}>
            {p.label}
          </span>
        </div>
      ))}
    </div>
  );
}
