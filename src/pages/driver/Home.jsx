import { useNavigate } from "react-router-dom";

import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { ProfitHome } from "../../components/home/Profit";
import { RecordHome } from "../../components/home/Record";
import { OdersHome } from "../../components/home/Oders";
import {
  getTodayOrders,
  getTotalHistoryCount,
} from "../../services/firebaseOrdres";

import "../../styles/driver/Home.css";
import { useEffect, useState } from "react";

export const Home = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalRecordsToday, setTotalRecordsToday] = useState(0);
  const [totalProfitToday, setTotalProfitToday] = useState(0); // Ganancia de hoy
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);

        const todayOrders = await getTodayOrders();

        const totalCount = await getTotalHistoryCount();

        const profitToday = todayOrders.reduce(
          (total, order) => total + parseFloat(order.amount || 0),
          0
        );

        setTotalRecordsToday(todayOrders.length);
        setTotalProfitToday(profitToday);
        setTotalRecords(totalCount);
      } catch (error) {
        console.error("Error cargando datos del home:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  const handlerRedirectHistory = () => {
    navigate("/History");
  };

  return (
    <div>
      <HeaderStatus />

      <HeaderHome variant="home" />

      <div className="content">
        <ProfitHome gananciaDia={totalProfitToday} />

        <RecordHome
          record={totalRecords}
          total={totalRecordsToday}
          onViewHistorial={handlerRedirectHistory}
        />

        <OdersHome mode="home" />
      </div>
    </div>
  );
};
