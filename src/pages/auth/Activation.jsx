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

  const checkIconPath = "/activation/CheckIcon.svg";

  const sobreIconPath = "/activation/Sobre.svg";

  useEffect(() => {
    const complete = code.every((digit) => digit !== "") && code.length === 4;
    setIsCodeComplete(complete);
  }, [code]);

  useEffect(() => {
    if (showSuccessModal) {
      console.log("=== VERIFICANDO SVG ===");
      console.log("Ruta SVG:", checkIconPath);
      console.log("URL completa:", window.location.origin + checkIconPath);

      fetch(checkIconPath)
        .then((res) => {
          console.log("Status SVG:", res.status);
          if (res.ok) {
            console.log("✅ SVG encontrado correctamente");
          } else {
            console.error("❌ SVG NO encontrado");
            console.log(
              "Probando ruta:",
              process.env.PUBLIC_URL + checkIconPath
            );
          }
        })
        .catch((err) => console.error("Error fetch SVG:", err));
    }
  }, [showSuccessModal]);

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

  const handleSvgError = (e) => {
    console.error("❌ ERROR cargando SVG desde:", checkIconPath);
    console.log("Elemento img:", e.target);

    e.target.style.display = "none";
    const parent = e.target.parentElement;

    const fallbackSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    fallbackSvg.setAttribute("class", "check-fallback");
    fallbackSvg.setAttribute("viewBox", "0 0 24 24");
    fallbackSvg.setAttribute("fill", "none");
    fallbackSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M20 6L9 17L4 12");
    path.setAttribute("stroke", "#33027D");
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    fallbackSvg.appendChild(path);
    parent.appendChild(fallbackSvg);

    console.log("✅ Mostrando fallback SVG");
  };

  const handleSvgLoad = () => {
    console.log("✅ SVG cargado exitosamente");
    setSvgLoaded(true);
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

              <p className="modal-message">
                Tu cuenta fue activada exitosamente.
              </p>
            </div>

            <div className="modal-center-section">
              <div className="success-icon">
                <img
                  src={checkIconPath}
                  alt="Check"
                  className="check-image"
                  onError={handleSvgError}
                  onLoad={handleSvgLoad}
                  style={{ display: svgLoaded ? "block" : "none" }}
                />

                {!svgLoaded && (
                  <svg
                    className="check-fallback"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#33027D"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
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
