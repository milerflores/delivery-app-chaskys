import "../../styles/orders/DeliveryConfirmation.css";
import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const DeliveryConfirmation = () => {
  const navigate = useNavigate();

  const handleRedirectSuccessfull = () => {
    navigate("/delivery-successfull");
  };
  return (
    <div>
      <HeaderStatus />
      <HeaderHome />
      <div className="card delivery-confirmation">
        <button onClick={handleRedirectSuccessfull}>Finalizar pedido</button>
      </div>
    </div>
  );
};
