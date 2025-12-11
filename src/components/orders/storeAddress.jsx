import { Icon } from "@iconify/react";
import "../../styles/orders/StoreAddress.css";

export const StoreAddress = ({
  address,
  name,
  instructions,
  showInstructions,
  iconHouse,
}) => {
  return (
    <div className="store-address-container">
      <div className="store-address">
        <div className="name-icon">
          <span>
            {iconHouse !== "house" ? (
              <Icon icon="la:store-alt" width="50" height="50" />
            ) : (
              <Icon icon="lsicon:house-outline" width="50" height="50" />
            )}
          </span>
        </div>
        <div className="store-information">
          <span className="store-name">{name}</span>
          <span>{address}</span>
        </div>
      </div>

      {showInstructions ? <span>{instructions}</span> : null}
    </div>
  );
};
