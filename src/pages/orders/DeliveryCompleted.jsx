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
    }, 4000);

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
            <img
              src="/src/assets/sand-clock.gif"
              alt="Cargando..."
              className="reloj-gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
