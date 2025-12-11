import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { useNavigate } from "react-router";
import { useDriver } from "../../context/DriverContext";
import { useState } from "react";
import { Icon } from "@iconify/react";

import "../../styles/orders/Rating.css";

export const Rating = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [selectedAspects, setSelectedAspects] = useState([]);

  const { confirmedOrder } = useDriver();

  const handleRedirectFinal = () => {
    navigate("/rating-sent");
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleAspectClick = (aspect) => {
    if (selectedAspects.includes(aspect)) {
      setSelectedAspects(selectedAspects.filter((item) => item !== aspect));
    } else {
      setSelectedAspects([...selectedAspects, aspect]);
    }
  };

  const isAspectSelected = (aspect) => {
    return selectedAspects.includes(aspect);
  };

  return (
    <div>
      <HeaderStatus></HeaderStatus>
      <HeaderHome></HeaderHome>
      <div className=" card container-principal">
        <div className="card-centro">
          <h1 className="valoraclientetxt">Valora al cliente</h1>
          <p className="opinion-txt">Tu opinion nos ayuda a mejorar</p>
          <div className="cuadro-cliente">
            <span>
              <Icon icon="openmoji:person" width="50" height="50" />
            </span>
            <p className="nombre-cliente-txt">{confirmedOrder.client}</p>
          </div>
          <p>¿Como fue tu experiencia?</p>
          <div className="seccion-estrellas">
            {[1, 2, 3, 4, 5].map((star, index) => (
              <Icon
                key={index}
                icon="mdi:star"
                width="45"
                height="45"
                onClick={() => handleStarClick(index)}
                className="estrella-icon"
                style={{
                  color: index < rating ? "#FFBE21" : "#C8C8C8",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, color 0.2s ease",
                }}
              />
            ))}
          </div>
          <p className="txtadicionales1">Selecciona aspectos (opcional)</p>
          <div className="miniconteiner-puntuacion1">
            <div
              className={`puntuacion1 ${
                isAspectSelected("Dirección Clara") ? "selected" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleAspectClick("Dirección Clara")}
            >
              <p className="puntuaciontxt">Dirección Clara</p>
            </div>
            <div
              className={`puntuacion2 ${
                isAspectSelected("Puntual") ? "selected" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleAspectClick("Puntual")}
            >
              <p className="puntuaciontxt">Puntual</p>
            </div>
          </div>
          <div className="miniconteiner-puntuacion2">
            <div
              className={`puntuacion3 ${
                isAspectSelected("Facil de contactar") ? "selected" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleAspectClick("Facil de contactar")}
            >
              <p className="puntuaciontxt">Facil de contactar</p>
            </div>
          </div>
          <p className="txtadicionales">Comentarios (opcional)</p>
          <input
            type="text"
            placeholder="Cuentanos tu experiencia..."
            className="input-experiencia"
          ></input>
          <button
            onClick={handleRedirectFinal}
            className="enviar-calificacion-btn"
          >
            Enviar calificación
          </button>
        </div>
      </div>
    </div>
  );
};
