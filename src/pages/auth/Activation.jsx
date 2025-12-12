import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { Icon } from "@iconify/react";
import "../../styles/auth/Activation.css";

export const Activation = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userData =
    location.state?.formData ||
    JSON.parse(localStorage.getItem("registerStep2")) ||
    {};
  const userEmail = userData.email || "correo@gmail.com";

  useEffect(() => {
    const complete = code.every((digit) => digit !== "") && code.length === 4;
    setIsCodeComplete(complete);
  }, [code]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activationCode = code.join("");
    if (activationCode.length === 4) {
      console.log("Código ingresado:", activationCode);
      console.log("Datos del usuario:", userData);

      setShowSuccessModal(true);
    } else {
      alert("Por favor ingresa el código completo de 4 dígitos");
    }
  };

  const handleStartDriving = () => {
    localStorage.removeItem("registerStep1");
    localStorage.removeItem("registerStep2");
    navigate("/home");
  };

  const handleResendCode = () => {
    console.log("Reenviando código a:", userEmail);
    alert(`Se ha reenviado el código a ${userEmail}`);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const closeModalOnOverlay = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="activation-container">
      <LogoChaskys descripcion={"Delivery App"} conmotorizado={false} />

      <section id="activation">
        <form onSubmit={handleSubmit} className="activation-form">
          <div className="activation-body">
            <div className="envelope-icon">
              <Icon icon="pepicons-pencil:letter" width="60" height="60" />
            </div>

            <h2 className="activation-title">¡Último paso!</h2>

            <p className="activation-instructions">
              Active su cuenta ingresando el código de 4 dígitos que se le envió
              al correo:
            </p>
            <p className="email">{userEmail}</p>

            <div className="code-inputs">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="code-input"
                  required
                />
              ))}
            </div>
          </div>

          <div className="accion-activation">
            <button
              type="submit"
              className={`btn btn-activate ${
                isCodeComplete ? "active" : "disabled"
              }`}
              disabled={!isCodeComplete}
            >
              Activar Cuenta
            </button>

            <div className="resend-container">
              <span className="resend-text">
                ¿No recibiste el código? <br />
                <button
                  type="button"
                  className="resend-link"
                  onClick={handleResendCode}
                >
                  Reenviar código
                </button>
              </span>
            </div>
          </div>
        </form>
      </section>

      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeModalOnOverlay}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top-section">
              <h2 className="modal-title">
                <span className="welcome-text">¡BIENVENIDO A </span>
                <span className="chaskys-text">Chaskys</span>
                <span className="exclamation">!</span>
              </h2>

              <p className="modal-message-activation">
                Tu cuenta fue activada exitosamente.
              </p>
            </div>

            <div className="modal-center-section">
              <div className="success-icon">
                <Icon
                  icon="lets-icons:check-ring-round"
                  width="120"
                  height="120"
                />
              </div>
            </div>

            <div className="modal-bottom-section">
              <p className="modal-submessage">
                ¡Nos alegra que te unas a la familia!
              </p>

              <button
                className="btn start-driving-btn"
                onClick={handleStartDriving}
              >
                ¡Empieza a conducir!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
