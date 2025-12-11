import { HeaderStatus } from "../../components/shared/HeaderStatus";
import { HeaderHome } from "../../components/home/Header";
import { useNavigate } from "react-router";
import { StoreAddress } from "../../components/orders/storeAddress";
import { useDriver } from "../../context/DriverContext";
import { Support } from "../../components/shared/support";
import { useState, useRef } from "react";
import { Icon } from "@iconify/react";

import "../../styles/orders/DeliverySuccessfull.css";

export const DeliverySuccessfull = () => {
  const { confirmedOrder, completeOrder } = useDriver();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleToggleCamera = () => {
    if (!photoTaken) {
      setShowCamera(!showCamera);
    }
  };

  const handleTakePhoto = () => {
    setPhotoTaken(true);

    setShowCamera(false);
  };

  const handleUploadFromGallery = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoTaken(true);
        setShowCamera(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelCamera = () => {
    setShowCamera(false);
  };

  const handleRedirectCompleted = () => {
    if (photoTaken) {
      setShowConfirmModal(true);
    }
  };
  const handleConfirmFinalize = () => {
    // completeOrder();
    setShowConfirmModal(false);
    navigate("/delivery-completed");
  };

  const handleCancelFinalize = () => {
    setShowConfirmModal(false);
  };

  return (
    <div>
      <HeaderStatus />
      <HeaderHome />

      <div className="card container-principal-quien">
        <div className="card-centro-recibio">
          {!showCamera ? (
            <>
              <div className="cuadro-superior-cliente-entrega">
                <Icon icon="solar:bag-4-bold" width="24" height="24" />
                <p className="entregando-usuario-txt">
                  Estás entregando al usuario
                </p>
              </div>

              <StoreAddress
                address={confirmedOrder.address.destination}
                name={confirmedOrder.client}
                iconHouse={"house"}
              />

              <div className="completa-campos">
                <p className="completa-campos-finalizar-txt">
                  Envía una foto para finalizar <br /> la entrega
                </p>
                <p className="uno-dos-campos-txt">1 campo obligatorio</p>
              </div>

              <div
                className="minicontainer-foto-entrega"
                onClick={handleToggleCamera}
                style={{ cursor: photoTaken ? "default" : "pointer" }}
              >
                <Icon
                  icon="mdi:camera"
                  width="25"
                  height="25"
                  className="camara-foto-img"
                />
                <div className="minicontainer-fototxt-campo">
                  <p className="foto-entrega-txt">Foto de entrega</p>
                  <div
                    className="campo-completado"
                    style={{
                      backgroundColor: photoTaken ? "#4ade80" : "#bbb6ff",
                    }}
                  >
                    <p>{photoTaken ? "Completado" : "Pendiente"}</p>
                  </div>
                </div>
                {!photoTaken && (
                  <div className="circuclo-flecha1">
                    <Icon
                      icon="mdi:chevron-right"
                      width="20"
                      height="20"
                      color="white"
                    />
                  </div>
                )}
              </div>

              <div className="container-soporte">
                <Support />
              </div>

              <div className="container-button">
                <button
                  className="finalizan-pedido-btn"
                  onClick={handleRedirectCompleted}
                  disabled={!photoTaken}
                  style={{
                    backgroundColor: photoTaken ? "#33027d" : "#cccccc",
                    cursor: photoTaken ? "pointer" : "not-allowed",
                    opacity: photoTaken ? 1 : 0.6,
                  }}
                >
                  Finalizar pedido
                </button>
              </div>
            </>
          ) : (
            <div className="camera-interface">
              <h2 className="camera-title">
                ¡Casi listo! Toma una foto de la entrega.
              </h2>

              <div className="camera-icon-container">
                <Icon
                  icon="mdi:camera"
                  width="80"
                  height="80"
                  color="#33027d"
                />
              </div>

              <p className="camera-instructions">
                Asegúrate de que el pedido y el número de puerta estén visibles
              </p>

              <div className="camera-buttons">
                <button
                  onClick={handleCancelCamera}
                  className="camera-btn camera-btn-cancel"
                >
                  <Icon icon="mdi:close" width="30" height="30" />
                </button>

                <button
                  onClick={handleTakePhoto}
                  className="camera-btn camera-btn-capture"
                >
                  <div className="capture-inner-circle" />
                </button>

                <button
                  onClick={handleUploadFromGallery}
                  className="camera-btn camera-btn-gallery"
                >
                  <Icon icon="mdi:image" width="30" height="30" />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>
        {showConfirmModal && (
          <>
            <div className="modal-overlay" onClick={handleCancelFinalize}></div>

            <div className="modal-confirmation">
              <div className="modal-header">
                <h2 className="modal-title">Confirma esta acción</h2>
                <button
                  className="modal-close-btn"
                  onClick={handleCancelFinalize}
                >
                  <Icon icon="mdi:close" width="24" height="24" />
                </button>
              </div>

              <p className="modal-message">
                ¿Estás seguro de querer finalizar este pedido?
              </p>

              <div className="modal-buttons">
                <button
                  className="modal-btn modal-btn-confirm"
                  onClick={handleConfirmFinalize}
                >
                  Finalizar
                </button>
                <button
                  className="modal-btn modal-btn-cancel"
                  onClick={handleCancelFinalize}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
