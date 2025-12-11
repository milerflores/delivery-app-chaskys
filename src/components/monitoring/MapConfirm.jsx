import { Order } from "../home/oders/Order";
import { Map } from "../shared/Map";
export const MapConfirmMonitoring = () => {
  return (
    <section className="card monitoring">
      <div className="btns-map-confirm">
        <button className="btn-accept" style={{ minWidth: "250px" }}>
          Pedido entregado
        </button>
        <img src="./call.svg" alt="llamar" />
      </div>
      {/* <Order /> */}
      <div className="map">
        <Map />
      </div>
    </section>
  );
};
