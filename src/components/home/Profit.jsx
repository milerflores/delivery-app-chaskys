export const ProfitHome = ({ gananciaDia }) => {
  return (
    <section className="profit-home">
      <span className="profit-home-title">Hoy</span>
      <span className="profit-home-summary">S/ {gananciaDia.toFixed(2)}</span>
    </section>
  );
};
