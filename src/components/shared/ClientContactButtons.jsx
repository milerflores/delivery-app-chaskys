import { useDriver } from "../../context/DriverContext";
import { Icon } from "@iconify/react";
import "../../styles/shared/ClientContactButtons.css";

export const ClientContactButtons = () => {
  const { confirmedOrder } = useDriver();
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `+52${cleaned}`;
    }
    return `+${cleaned}`;
  };

  const handleCall = () => {
    if (!confirmedOrder.phoneClient) {
      alert("No hay número de teléfono disponible");
      return;
    }
    const formattedNumber = formatPhoneNumber(confirmedOrder.phoneClient);
    window.open(`tel:${formattedNumber}`, "_self");
  };

  const handleWhatsApp = () => {
    window.open(`https://www.whatsapp.com/`, "_blank");
  };

  return (
    <div className="client-contact-buttons">
      {confirmedOrder.phoneClient && (
        <button
          className="contact-btn call-btn"
          onClick={handleCall}
          aria-label={`Llamar a ${confirmedOrder.clientName || "cliente"}`}
          title={`Llamar a ${confirmedOrder.clientName || "cliente"}`}
        >
          <Icon icon="mage:phone-call-fill" width="24" height="24" />
        </button>
      )}
      <button
        className="contact-btn whatsapp-btn"
        onClick={handleWhatsApp}
        aria-label="Abrir WhatsApp"
        title="Abrir WhatsApp"
      >
        <Icon icon="mingcute:whatsapp-fill" width="24" height="24" />
      </button>
    </div>
  );
};
