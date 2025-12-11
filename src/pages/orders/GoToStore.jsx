import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { SwipeButton } from "../../components/shared/SwipeButton";
import { StoreAddress } from "../../components/orders/storeAddress";
import { MapButton } from "../../components/orders/mapButton";
import { Map } from "../../components/shared/Map";
import { MapModal } from "../../components/shared/mapModal";
import { OrderConfirmationToast } from "../../components/orders/orderConfirmationToast";
import { useDriver } from "../../context/DriverContext";
import "../../styles/orders/GoToStore.css";

export function GoToStore() {
  const navigate = useNavigate();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const initialDriverLocation = [-77.04, -12.06];
  const { confirmedOrder } = useDriver();

  useEffect(() => {
    if (!confirmedOrder) {
      alert("No hay pedido confirmado");
      navigate("/home");
    }
  }, [confirmedOrder, navigate]);

  const handleRedirectInStore = () => {
    navigate("/in-store");
  };

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
    <>
      <HeaderStatus />
      <HeaderHome />
      <OrderConfirmationToast
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        autoCloseDuration={3000}
      />
      <div className="card go-to-store">
        <span className="go-to-store-title">Dirígete a la tienda</span>
        <StoreAddress
          address={confirmedOrder.address.origin}
          name={confirmedOrder.store.name}
        />
        <MapButton onClick={() => setIsMapOpen(true)} />
        <div className="map-preview">
          <Map
            mOrigin={confirmedOrder.origin}
            mDestination={confirmedOrder.destination}
            driverLocation={initialDriverLocation}
            mode="full"
          />
        </div>
        <div className="go-store-instructions">
          <span>Instrucciones</span>
          <span>{confirmedOrder.instructions.store}</span>
        </div>
        <SwipeButton text={"Ir a la tienda"} onSlide={handleRedirectInStore} />
      </div>

      {isMapOpen && (
        <MapModal
          onClose={() => setIsMapOpen(false)}
          mOrigin={confirmedOrder.origin}
          mDestination={confirmedOrder.destination}
          driverLocation={initialDriverLocation}
          storeName={confirmedOrder.store.name}
          storeAddress={confirmedOrder.address.origin}
          estimatedTime="2 min"
          arrivalTime="9:48pm"
          mode="full"
        />
      )}
    </>
  );
}
