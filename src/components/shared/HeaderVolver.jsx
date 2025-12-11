import "../../styles/shared/HeaderVolver.css";
import { Icon } from "@iconify/react";
import { Navigate, useNavigate } from "react-router";

export function HeaderVolver() {
  const navigate = useNavigate();

  const handlerVolver = () => {
    navigate(-1);
  };

  return (
    <button onClick={handlerVolver} className="header-volver">
      <span>
        <Icon icon="ri:arrow-go-back-line" width="30" height="30" />
      </span>
      <span>Volver</span>
    </button>
  );
}
