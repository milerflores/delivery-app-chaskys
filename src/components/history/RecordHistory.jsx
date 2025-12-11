export function RecordHistory({ tab, setTab, total }) {
  return (
    <div className="record-history">
      <div className="record-seccion-textos">
        <span>GANANCIAS</span>
        <span>
          {tab === "hoy" && "Ganancia de Hoy:"}
          {tab === "semanal" && "Ganancia Semanal:"}
          {tab === "historico" && "Ganancia Histórico:"}
        </span>
        <span>{`S/. ${total.toFixed(2)}`}</span>
      </div>
      <div className="record-seccion-botones">
        <button
          className={`${tab === "hoy" ? "active" : ""}`}
          onClick={() => setTab("hoy")}
        >
          Hoy
        </button>
        <button
          className={`${tab === "semanal" ? "active" : ""}`}
          onClick={() => setTab("semanal")}
        >
          Semanal
        </button>
        <button
          className={`${tab === "historico" ? "active" : ""}`}
          onClick={() => setTab("historico")}
        >
          Histórico
        </button>
      </div>
    </div>
  );
}
