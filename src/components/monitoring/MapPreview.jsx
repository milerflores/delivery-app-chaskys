import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Order } from "../home/oders/Order";
import { Map } from "../shared/Map";
import { useDriver } from "../../context/DriverContext";

export const MapMonitoring = ({ id }) => {
  const [isLoagin, setIsLoagin] = useState(false);
  const [count, setCount] = useState(5);
  const {
    selectedOrder,
    availableOrders,
    isConnected,
    confirmOrder,
    cancelSelection,
  } = useDriver();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (selectedOrder && selectedOrder.id == id) {
      setOrder(selectedOrder);
    } else {
      const foundOrder = availableOrders.find((o) => o.id == id);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        alert("Pedido no encontrado");
        navigate("/home");
      }
    }
  }, [id, selectedOrder, availableOrders]);

  const handlerCancel = () => {
    cancelSelection();
    navigate("/home");
  };

  const handlerAccept = () => {
    confirmOrder();
    setIsLoagin(true);
    setCount(5);
    const countInterval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countInterval);
          setIsLoagin(false);
          navigate("/go-to-store");
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      setCount(5);
      setIsLoagin(false);
      clearInterval(countInterval);
    };
  };

  const initialDriverLocation = [-77.04, -12.06];

  if (!order) {
    return (
      <section className="card monitoring">
        <div style={{ padding: "20px", textAlign: "center" }}>
          Cargando pedido...
        </div>
      </section>
    );
  }

  return (
    <section className="card monitoring">
      <div className="section-btn-cancel">
        <button
          className="btn-cancel-order"
          style={isLoagin ? { display: "none" } : {}}
          onClick={handlerCancel}
        >
          Descartar pedido
        </button>
      </div>
      <Order
        id={order.id}
        address={order.address}
        amount={order.amount}
        client={order.client}
        km={order.km}
        metodopago={order.metodopago}
        disabled={!isConnected}
        mode={"monitoring"}
      />

      <div
        className="loagin-accept"
        style={{ display: isLoagin ? "flex" : "none" }}
      >
        <img src="/cargando.svg" alt="" />
        <span>Aceptando carrera...!</span>
        <span>{count}s</span>
        <button className="btn-cancel-loading" onClick={handlerCancel}>
          CANCELAR
        </button>
      </div>

      <div className="map" style={{ display: isLoagin ? "none" : "block" }}>
        <Map
          mOrigin={order.origin}
          mDestination={order.destination}
          driverLocation={initialDriverLocation}
          mode="full"
        />
      </div>
      <div className="section-btn-accept">
        <button
          className="btn-accept-order"
          style={isLoagin ? { display: "none" } : {}}
          onClick={handlerAccept}
        >
          TOMAR PEDIDO
        </button>
      </div>
    </section>
  );
};
