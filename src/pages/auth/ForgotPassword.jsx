import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { Icon } from "@iconify/react";
import "../../styles/auth/ForgotPassword.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando enlace de recuperación a:", email);

    navigate("/change-password", {
      state: { email: email },
    });
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="forgot-password-page">
      <LogoChaskys descripcion={"Delivery App"} conmotorizado={false} />

      <section className="forgot-password-container">
        <span className="forgot-password-icon">
          <Icon icon="mynaui:lock-password" width="60" height="60" />
        </span>
        <h2 className="recover-title">Recuperar Contraseña</h2>

        <div className="instructions">
          <p>Ingresa tu correo electrónico</p>
          <p>y te enviaremos</p>
          <p>un enlace para restablecer</p>
          <p>tu contraseña</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="input-section">
            <label htmlFor="email" className="input-label">
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Escribe tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="action-buttons">
            <button type="submit" className="btn-recovery">
              Enviar enlace de recuperación
            </button>

            <button
              type="button"
              className="btn-back-login"
              onClick={handleBackToLogin}
            >
              <span className="back-arrow">←</span>
              Regresar a iniciar sesión
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
