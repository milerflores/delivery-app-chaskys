import { Icon } from "@iconify/react";

import "../../styles/orders/MapButton.css";

export const MapButton = ({ onClick }) => {
  return (
    <div className="map-button-container">
      <button className="map-button" onClick={onClick}>
        <span>Cómo llegar</span>
        <Icon icon="grommet-icons:map" width="24" height="24" />
      </button>
    </div>
  );
};
