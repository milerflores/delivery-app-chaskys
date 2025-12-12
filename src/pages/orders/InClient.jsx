import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { StoreAddress } from "../../components/orders/storeAddress";
import { SwipeButton } from "../../components/shared/SwipeButton";
import { Support } from "../../components/shared/support";
import { useDriver } from "../../context/DriverContext";

import "../../styles/orders/InClient.css";
import { ClientContactButtons } from "../../components/shared/ClientContactButtons";

export const InClient = () => {
  const navigate = useNavigate();
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(true);

  const { confirmedOrder } = useDriver();

  useEffect(() => {
    if (!confirmedOrder) {
      alert("No hay pedido confirmado");
      navigate("/home");
    }
  }, [confirmedOrder, navigate]);

  const handleConfirm = () => {
    setIsSwipeEnabled(true);
  };
  const handleGoToNextPage = () => {
    navigate("/delivery-successfull");
  };

  if (!confirmedOrder) {
    return (
      <>
        <HeaderStatus />
        <HeaderHome />
        <div className="card in-client">
          <span>Cargando pedido...</span>
        </div>
      </>
    );
  }
  return (
    <div>
      <HeaderStatus />
      <HeaderHome />
      <div className="card in-client">
        <StoreAddress
          name={confirmedOrder.client}
          address={confirmedOrder.address.destination}
          instructions={confirmedOrder.instructions.client}
          showInstructions={true}
          iconHouse={"house"}
        />
        <div className="client-button">
          <ClientContactButtons />
        </div>

        <div className="title-instructions">
          <span>Instrucciones:</span>
        </div>
        <div className="section-advice">
          <div>
            <span>
              <Icon icon="fa7-solid:person" width="30" height="30" />
            </span>
            <span>Entrega los productos al cliente</span>
          </div>
          <div>
            <span>
              <Icon icon="wpf:bank-cards" width="23" height="23" />
            </span>
            <span>
              {confirmedOrder.metodopago === "Efectivo"
                ? `Cobrar S/ ${confirmedOrder.amount} en efectivo`
                : "El cliente ya pagó el pedido con tarjeta"}
            </span>
          </div>
          <div>
            <span>
              <Icon icon="gg:check-o" width="24" height="24" />
            </span>
            <span>
              Validar el código antes de la entrega:{" "}
              {confirmedOrder.validationCode}
            </span>
          </div>
        </div>
        <Support />
        <SwipeButton
          text="Entregué el pedido"
          onSlide={handleGoToNextPage}
          disabled={!isSwipeEnabled}
        />
      </div>
    </div>
  );
};
