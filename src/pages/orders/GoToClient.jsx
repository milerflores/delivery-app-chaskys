import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { StoreAddress } from "../../components/orders/storeAddress";
import { MapButton } from "../../components/orders/mapButton";
import { MapModal } from "../../components/shared/mapModal";
import { SwipeButton } from "../../components/shared/SwipeButton";
import { Map } from "../../components/shared/Map";
import { Support } from "../../components/shared/support";
import { useDriver } from "../../context/DriverContext";
import "../../styles/orders/GoToClient.css";
import { ClientContactButtons } from "../../components/shared/ClientContactButtons";

export const GoToClient = () => {
  const navigate = useNavigate();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { confirmedOrder } = useDriver();

  const handleRedirectInClient = () => {
    navigate("/in-client");
  };

  useEffect(() => {
    if (!confirmedOrder) {
      alert("No hay pedido confirmado");
      navigate("/home");
    }
  }, [confirmedOrder, navigate]);

  if (!confirmedOrder) {
    return (
      <>
        <HeaderStatus />
        <HeaderHome />
        <div className="card go-to-store">
          <span>Cargando pedido...</span>
        </div>
      </>
    );
  }
  return (
    <div className="to-client-container">
      <HeaderStatus />
      <HeaderHome />
      <div className="card go-to-client">
        <span className="go-to-client-title">Dirígete al cliente</span>
        <StoreAddress
          address={confirmedOrder.address.destination}
          name={confirmedOrder.client}
        />
        <ClientContactButtons />
        <MapButton onClick={() => setIsMapOpen(true)} />
        <div className="map-preview">
          <Map
            mOrigin={confirmedOrder.origin}
            mDestination={confirmedOrder.destination}
            driverLocation={confirmedOrder.origin}
            mode="toclient"
          />
        </div>
        <div className="go-client-instructions">
          <span>Instrucciones</span>
          <span>{confirmedOrder.instructions.client}</span>
        </div>
        <Support />

        <SwipeButton
          text={"Llegué al domicilio"}
          onSlide={handleRedirectInClient}
        />
      </div>
      {isMapOpen && (
        <MapModal
          onClose={() => setIsMapOpen(false)}
          mOrigin={confirmedOrder.origin}
          mDestination={confirmedOrder.destination}
          driverLocation={confirmedOrder.origin}
          storeName={confirmedOrder.client}
          storeAddress={confirmedOrder.address.destination}
          estimatedTime="5 min"
          arrivalTime="10:00pm"
          mode={"toclient"}
        />
      )}
    </div>
  );
};
