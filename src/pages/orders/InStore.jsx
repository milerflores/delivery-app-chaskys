import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { SwipeButton } from "../../components/shared/SwipeButton";
import { StoreAddress } from "../../components/orders/storeAddress";
import { Support } from "../../components/shared/support";
import { useDriver } from "../../context/DriverContext";

import "../../styles/orders/instore.css";

export const InStore = () => {
  const navigate = useNavigate();
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(false);
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
    navigate("/go-to-client");
  };

  if (!confirmedOrder) {
    return <div>Cargando...</div>;
  }

  return (
    <div className=" in-store-container">
      <HeaderStatus />
      <HeaderHome />
      <div className="card in-store-body">
        <StoreAddress
          name={confirmedOrder.store.name}
          address={confirmedOrder.address.origin}
          instructions={confirmedOrder.instructions.store}
          showInstructions={true}
        />
        <p className="pickup-order">Retira el pedido</p>
        <div className="order-id-name">
          <span>
            <Icon icon="mynaui:box" width="40" height="40" />
          </span>
          <div className="section-client-order">
            <span>ID pedido: {confirmedOrder.code}</span>
            <span>{confirmedOrder.client}</span>
            <span>{confirmedOrder.items.length} productos</span>
          </div>
        </div>
        <div className="list-items-order">
          <ol>
            {confirmedOrder.items.map((list, index) => (
              <li key={index}>{list.description}</li>
            ))}
          </ol>
        </div>
        <div className="confirm-button-container">
          <button className="button-confirm" onClick={handleConfirm}>
            Tengo el pedido
          </button>
        </div>
        <Support />
        <SwipeButton
          text="Ir al domicilio"
          onSlide={handleGoToNextPage}
          disabled={!isSwipeEnabled}
        />
      </div>
    </div>
  );
};
