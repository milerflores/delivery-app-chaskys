import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";

import "../../styles/orders/RatingSent.css";

export const RatingSent = () => {
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate("/home");
  };
  return (
    <div>
      <HeaderStatus></HeaderStatus>
      <HeaderHome></HeaderHome>
      <div className="card container-principal">
        <div className="card-centro">
          <div className="icono-card-centro">
            <Icon icon="prime:check-circle" width="220" height="220" />
          </div>
          <p className="graciasPorAyudatxt">Gracias por tu ayuda</p>
          <p className="pedidofinalizadotxt">
            Calificación<br></br> enviada!
          </p>
          <button onClick={handleRedirectHome} className="volver-pedidos-btn">
            VOLVER A PEDIDOS
          </button>
        </div>
      </div>
    </div>
  );
};
