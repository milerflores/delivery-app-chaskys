import { Order } from "./oders/Order";
import { useDriver } from "../../context/DriverContext";

export const OdersHome = ({ mode }) => {
  const { availableOrders, isConnected, isLoadingOrders } = useDriver();

  if (isLoadingOrders) {
    return (
      <section className="card order-home">
        <div className="order-home-title">
          <span>PEDIDOS DISPONIBLES</span>
          <span>(Cargando...)</span>
        </div>
        <div style={{ padding: "20px", textAlign: "center" }}>
          Cargando pedidos disponibles...
        </div>
      </section>
    );
  }

  return (
    <section className="card order-home">
      <div className="order-home-title">
        <span>PEDIDOS DISPONIBLES</span>
        <span className="subtitle-orders">
          {isConnected
            ? "(Selecciona un pedido)"
            : "(Conéctate para tomar pedidos)"}
        </span>
      </div>
      {availableOrders.length === 0 ? (
        <div style={{ padding: "20px", textAlign: "center" }}>
          No hay pedidos disponibles
        </div>
      ) : (
        availableOrders.map((o) => (
          <Order
            key={o.id}
            id={o.id}
            client={o.client}
            amount={o.amount}
            address={o.address}
            km={o.km}
            metodopago={o.metodopago}
            disabled={!isConnected}
            mode={mode}
          />
        ))
      )}
    </section>
  );
};
