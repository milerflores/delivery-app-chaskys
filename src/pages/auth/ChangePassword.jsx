import { useNavigate } from "react-router-dom";
import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { Icon } from "@iconify/react";
import "../../styles/auth/ChangePassword.css";

export const ChangePassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      return;
    }

    navigate("/password-changed");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="change-password-page">
      <LogoChaskys descripcion={"Delivery App"} conmotorizado={false} />
      <span className="password-change-icon">
        <Icon icon="mynaui:lock-password" width="60" height="60" />
      </span>
      <div className="change-password-container">
        <h2 className="change-title">Cambiar Contraseña</h2>

        <div className="instructions">
          <p>Crea una nueva contraseña segura para tu cuenta</p>
        </div>

        <form className="change-password-form" onSubmit={handleSubmit}>
          <div className="input-section">
            <label className="input-label">Nueva contraseña:</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Crea una contraseña segura"
              required
            />
          </div>

          <div className="input-section">
            <label className="input-label">Confirmar nueva contraseña:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirma tu nueva contraseña"
              required
            />
          </div>

          <div className="action-buttons">
            <button type="submit" className="btn-change">
              Cambiar contraseña
            </button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
