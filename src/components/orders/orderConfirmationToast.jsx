import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "../../styles/orders/OrderConfirmationToast.css";

export function OrderConfirmationToast({
  isVisible,
  onClose,
  autoCloseDuration = 4000,
}) {
  useEffect(() => {
    if (isVisible && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, autoCloseDuration]);

  if (!isVisible) return null;

  return (
    <div className="toast-container">
      <div className="toast-content">
        <div className="toast-icon">
          <Icon icon="mdi:check-circle" width="24" />
        </div>

        <span className="toast-message">¡Pedido Confirmado exitosamente!</span>

        <button className="toast-close-btn" onClick={onClose}>
          <Icon icon="mdi:close" width="20" />
        </button>
      </div>
    </div>
  );
}
