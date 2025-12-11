import { useNavigate } from "react-router-dom";
import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { Icon } from "@iconify/react";
import "../../styles/auth/PasswordChangedScreen.css";

export const PasswordChangedScreen = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const checkIconPath = "/check.svg";

  const handleImageError = (e) => {
    console.error("Error cargando SVG desde:", checkIconPath);

    const container = e.target.parentElement;
    container.innerHTML = `
      <div style="
        width: 120px; 
        height: 120px; 
        background-color: #4CAF50; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        color: white; 
        font-size: 60px; 
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
      ">
        ✓
      </div>
    `;
  };

  return (
    <div className="password-changed-page">
      <LogoChaskys descripcion={"Delivery App"} conmotorizado={false} />

      <div className="password-changed-container">
        <span className="password-changed-icon">
          <Icon icon="lets-icons:check-ring-round" width="100" height="100" />
        </span>

        <h2 className="success-title">¡Contraseña Cambiada!</h2>

        <p className="success-message">
          Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar
          sesión con tu nueva contraseña
        </p>

        <div className="action-buttons">
          <button className="btn-login-password-changed" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
