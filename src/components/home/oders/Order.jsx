import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDriver } from "../../../context/DriverContext";

export const Order = ({
  id,
  client,
  amount,
  address,
  km,
  metodopago,
  disabled,
  mode,
}) => {
  const navigate = useNavigate();
  const { selectOrder } = useDriver();

  const handlerRedictMonitoring = () => {
    if (!disabled && mode === "home") {
      selectOrder(id);
      navigate("/monitoring-order/" + id);
    }
  };

  const iconosPago = {
    efectivo: <Icon icon="ph:coins-fill" />,
    tarjeta: <Icon icon="wpf:bank-cards" />,
  };

  return (
    <div
      className={
        mode === "monitoring"
          ? "card-order monitoring-card"
          : `card-order ${disabled ? "disabled" : "active"}`
      }
      onClick={
        mode === "home" && !disabled ? handlerRedictMonitoring : undefined
      }
    >
      <div className="card-order-name-summary">
        <span>{client}</span>
        <span>S/ {amount}</span>
      </div>
      <div className="card-order-details">
        <span>{address.origin}</span>

        <div>
          <span>Distancia: </span>
          <span>{km}km</span>
        </div>

        <span>{address.destination}</span>
        <div className="tarjeta-efectivo">
          {iconosPago[metodopago?.toLowerCase()] ?? null}

          <span>{metodopago}</span>
        </div>
      </div>
    </div>
  );
};
