import { Map } from "../shared/Map";
import "../../styles/shared/MapModal.css";
import { Icon } from "@iconify/react";

export const MapModal = ({
  onClose,
  mOrigin,
  mDestination,
  driverLocation,
  storeName,
  storeAddress,
  estimatedTime = "2 min",
  arrivalTime = "9:48pm",
  mode,
}) => {
  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="map-modal-close" onClick={onClose}>
          <Icon icon="mdi:close" width="24" height="24" />
        </button>

        <div className="map-modal-map">
          <Map
            mOrigin={mOrigin}
            mDestination={mDestination}
            driverLocation={driverLocation}
            mode={mode}
            height="100%"
          />
        </div>

        <div className="map-modal-info">
          <div className="map-modal-store">
            <Icon
              icon="mdi:store"
              width="24"
              height="24"
              className="store-icon"
            />
            <div className="store-details">
              <h3>{storeName}</h3>
              <p>{storeAddress}</p>
            </div>
          </div>

          <div className="map-modal-eta">
            <div className="eta-time">
              <span className="eta-minutes">{estimatedTime}</span>
            </div>
            <div className="eta-arrival">
              <span>Llegada - {arrivalTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
