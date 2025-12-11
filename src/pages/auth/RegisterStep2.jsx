import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/auth/RegisterStep2.css";

export const RegisterStep2 = () => {
  const [vehicleForm, setVehicleForm] = useState({
    license: "",
    soat: "",
    plate: "",
    vehicleType: "motocicleta",
    acceptTerms: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const userData =
    location.state?.formData ||
    JSON.parse(localStorage.getItem("registerStep1")) ||
    {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicleForm.acceptTerms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    const completeData = { ...userData, ...vehicleForm };
    localStorage.setItem("registerStep2", JSON.stringify(completeData));
    navigate("/activation", { state: { formData: completeData } });
  };

  const goBack = () => {
    navigate("/register", { state: { formData: userData } });
  };

  return (
    <div className="register-step2-container">
      <LogoChaskys descripcion={"Registro Delivery app"} conmotorizado={true} />

      <div className="form-step2">
        <form onSubmit={handleSubmit} className="register-form-step2">
          <div className="form-body-step2">
            <div className="input-group">
              <input
                type="text"
                name="license"
                placeholder="Licencia"
                value={vehicleForm.license}
                onChange={(e) =>
                  setVehicleForm({ ...vehicleForm, license: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="soat"
                placeholder="Soat"
                value={vehicleForm.soat}
                onChange={(e) =>
                  setVehicleForm({ ...vehicleForm, soat: e.target.value })
                }
                required
              />
              <input
                type="text"
                name="plate"
                placeholder="Placa"
                value={vehicleForm.plate}
                onChange={(e) =>
                  setVehicleForm({ ...vehicleForm, plate: e.target.value })
                }
                required
              />
            </div>

            <div className="section-title">Medio de transporte</div>
            <div className="vehicle-type-section">
              <label className="vehicle-radio-label">
                <input
                  type="radio"
                  name="vehicleType"
                  value="motocicleta"
                  checked={vehicleForm.vehicleType === "motocicleta"}
                  onChange={() =>
                    setVehicleForm({
                      ...vehicleForm,
                      vehicleType: "motocicleta",
                    })
                  }
                />
                <span className="radio-text">Motocicleta</span>
                <div className="radio-indicator"></div>
              </label>
            </div>

            <div className="terms-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={vehicleForm.acceptTerms}
                  onChange={(e) =>
                    setVehicleForm({
                      ...vehicleForm,
                      acceptTerms: e.target.checked,
                    })
                  }
                  required
                />
                <span className="checkbox-indicator"></span>
                <span className="terms-text">
                  Al conectarme acepto los T&Cs Generales de uso de Zoomy y la
                  Política de tratamiento de datos personales.
                </span>
              </label>
            </div>
          </div>

          <div className="accion-step2-buttons">
            <button type="submit" className="btn-crear-cuenta-final">
              Crear una cuenta
            </button>
            <button
              type="button"
              className="btn-regresar-paso"
              onClick={goBack}
            >
              <span className="back-arrow-large">←</span>
              Regresar al paso anterior
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
