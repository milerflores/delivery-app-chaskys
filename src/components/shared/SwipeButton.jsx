import { useState, useEffect } from "react";
import "../../styles/shared/SwipeButton.css";

export const SwipeButton = ({
  text = "Ir a la Tienda",
  onSlide,
  disabled = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleStart = (clientX) => {
    if (disabled) return;
    setIsDragging(true);
    setStartX(clientX - position);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;

    const newPosition = clientX - startX;
    const maxPosition = window.innerWidth - 80;

    if (newPosition >= 0 && newPosition <= maxPosition) {
      setPosition(newPosition);

      if (newPosition >= maxPosition * 0.95) {
        setIsDragging(false);
        setPosition(0);
        if (onSlide) onSlide();
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setPosition(0);
  };

  const handleMouseDown = (e) => handleStart(e.clientX);
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, position, startX]);

  return (
    <div className="sliding-bar-container">
      <div className="sliding-bar-track">
        {/* Barra de relleno que termina justo donde empieza el borde derecho del botón */}
        {position > 0 && (
          <div
            className="sliding-bar-fill"
            style={{
              left: "4px",
              width: `${position + 4 + 56}px`, // position + left offset (4px) + ancho completo del botón (56px)
              transition: isDragging ? "none" : "width 0.3s ease-out",
            }}
          />
        )}

        <div className="sliding-bar-text">
          <span>{text}</span>
        </div>

        <div
          className={`sliding-bar-button ${isDragging ? "dragging" : ""} ${
            disabled ? "disabled" : ""
          }`}
          style={{
            transform: `translateX(${position}px) translateY(-50%)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
            cursor: disabled ? "not-allowed" : isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};
