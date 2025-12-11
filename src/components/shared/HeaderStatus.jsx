import "../../styles/shared/HeaderStatus.css";
import { useDriver } from "../../context/DriverContext";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export function HeaderStatus() {
  const { isConnected, switchConnection } = useDriver();

  const navigate = useNavigate();

  const handleRedirectProfile = () => {
    navigate("/profile");
  };

  return (
    <section>
      <div className="header-status">
        <div className="header-status-profile" onClick={handleRedirectProfile}>
          <span>
            <Icon icon="qlementine-icons:user-16" width="30" height="30" />
          </span>
          <span>Perfil</span>
        </div>
        <div className="header-status-switch">
          <span>{isConnected ? "Estás conectado" : "Estás desconectado"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isConnected}
              onChange={switchConnection}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </section>
  );
}
