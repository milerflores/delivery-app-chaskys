import { useParams } from "react-router-dom";
import { HeaderHome } from "../../components/home/Header";
import { MapMonitoring } from "../../components/monitoring/MapPreview";
import { HeaderStatus } from "../../components/shared/HeaderStatus";

import "../../styles/orders/MonitoringOrder.css";

export const MonitoringOrder = () => {
  const { id } = useParams();

  return (
    <>
      <HeaderStatus />
      <HeaderHome />
      <MapMonitoring id={id} />
    </>
  );
};
