import { useEffect, useState } from "react";
import { Order } from "../home/oders/Order";
import { useDriver } from "../../context/DriverContext";

export const HistoryOrders = ({ orders }) => {
  const { isConnected } = useDriver();

  return (
    <div>
      <div className="order-history-title">
        <span>HISTORIAL DE PEDIDOS</span>
      </div>
      <div className="card order-home">
        {orders.map((o) => (
          <Order
            key={o.id}
            id={o.id}
            client={o.client}
            amount={o.amount}
            address={o.address}
            km={o.km}
            metodopago={o.metodopago}
            disabled={true}
          />
        ))}
      </div>
    </div>
  );
};
