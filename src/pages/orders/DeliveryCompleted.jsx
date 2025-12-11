import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Icon } from "@iconify/react";

import "../../styles/orders/DeliveryCompleted.css";

export const DeliveryCompleted = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/rating");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <HeaderStatus />
      <HeaderHome />

      <div className="card container-principal">
        <div className="card-centro">
          <div className="icono-card-centro">
            <Icon icon="prime:check-circle" width="220" height="220" />
          </div>
          <p className="pedidofinalizadotxt">
            Pedido <br /> Finalizado!
          </p>

          <div className="reloj-wrapper">
            <Icon
              icon="mdi:clock-time-eight-outline"
              width="70"
              height="70"
              className="spin-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
