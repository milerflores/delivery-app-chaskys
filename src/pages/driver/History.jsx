import { useEffect, useState } from "react";
import { HeaderVolver } from "../../components/shared/HeaderVolver";
import { HeaderHome } from "../../components/home/Header";
import { RecordHistory } from "../../components/history/RecordHistory";
import { HistoryOrders } from "../../components/history/HistoryOrders";
import { getOrders } from "../../services/ordersService";
import { getHistoryOrders } from "../../services/firebaseOrdres";
import "../../styles/driver/History.css";

export function History() {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("hoy");

  const total = orders.reduce(
    (parcial, item) => parcial + parseFloat(item.amount),
    0
  );

  useEffect(() => {
    async function loadHistory() {
      const all = await getHistoryOrders();

      const today = new Date();
      const startOfToday = new Date(today);
      startOfToday.setHours(0, 0, 0, 0);

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);

      let result = all;

      if (tab === "hoy") {
        result = all.filter((o) => {
          const orderDate = o.created_at.toDate();
          return orderDate >= startOfToday;
        });
      }

      if (tab === "semanal") {
        result = all.filter((o) => {
          const orderDate = o.created_at.toDate();
          return orderDate >= weekAgo;
        });
      }

      if (tab === "historico") {
        result = all;
      }

      setOrders(result);
    }

    loadHistory();
  }, [tab]);

  return (
    <section>
      <HeaderVolver />
      <HeaderHome variant="history" />
      <div className="content-history">
        <RecordHistory tab={tab} setTab={setTab} total={total} />
      </div>
      <HistoryOrders orders={orders} />
    </section>
  );
}
