import "../../styles/shared/SupportModal.css";
export const SupportModal = ({ open, onClose }) => {
  if (!open) return null;

  const whatsappNumber = "948758293";

  // const handleOpenWhatsApp = () => {
  //   const url = `https://wa.me/51${whatsappNumber}`;
  //   window.open(url, "_blank");
  // };
  const handleOpenWhatsApp = () => {
    const url = `https://www.whatsapp.com/`;
    window.open(url, "_blank");
  };

  return (
    <div className="support-modal-overlay">
      <div className="support-modal">
        <h2>Soporte técnico</h2>
        <p>
          El número de soporte técnico es <b>{whatsappNumber}</b>, ¿Deseas
          iniciar un chat de WhatsApp con soporte técnico?
        </p>

        <div className="support-modal-buttons">
          <button className="btn-cancel-modal" onClick={onClose}>
            Regresar
          </button>
          <button className="btn-ok-modal" onClick={handleOpenWhatsApp}>
            Iniciar Chat
          </button>
        </div>
      </div>
    </div>
  );
};
