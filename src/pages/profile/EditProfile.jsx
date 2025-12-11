import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../../styles/profile/EditProfile.css";
import { HeaderVolver } from "../../components/shared/HeaderVolver";

export const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "jgonzales",
    password: "**********",
    confirmPassword: "**********",
    fullName: "Jhefferson Gonzales Prada",
    phone: "987654321",
    email: "jgonzales.22@gmail.com",
    soatNumber: "8022-700000001231",
    license: "Q07824573",
    vehiclePlate: "ABC-123",
  });

  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData((prev) => ({
        ...prev,
        ...parsedData,
        password: parsedData.password || "**********",
        confirmPassword: parsedData.password || "**********",
      }));
    }

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const getInitials = (name) => {
    if (!name) return "JG";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/profile");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate("/profile");
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRedirectLevels = () => {
    navigate("/user-levels");
  };

  return (
    <div className="edit-profile-page">
      <HeaderVolver onBack={handleBack} />

      <div className="edit-logo">
        <h1 className="edit-title-h1">Chaskys</h1>
        <p className="edit-subtitle">Delivery app</p>
      </div>

      <div className="edit-profile-container">
        <div className="edit-profile-top-section">
          <div className="edit-profile-photo-section">
            <div className="edit-profile-img-container">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="edit-profile-initials">
                  {getInitials(userData.fullName)}
                </div>
              )}
            </div>

            <label className="edit-change-photo-btn">
              <Icon icon="mdi:camera" width="18" height="18" />
              cambiar foto
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="edit-profile-name-section">
            <h2 className="edit-profile-name">{userData.fullName}</h2>
          </div>
        </div>

        <div className="edit-level-rating-container">
          <div className="edit-level-and-menu-container">
            <div
              onClick={handleRedirectLevels}
              className="edit-chaskys-level-card"
            >
              <span className="edit-level-left">Nivel: Chaskys Silver</span>
            </div>

            <button
              onClick={handleRedirectLevels}
              className="edit-menu-dots-btn"
            >
              <Icon icon="mdi:dots-horizontal" width="24" height="24" />
            </button>
          </div>

          <div className="edit-rating-display">
            <div className="edit-rating-label">CALIFICACIÓN</div>
            <div className="edit-rating-number">4.6</div>
          </div>
        </div>

        <div className="edit-user-outside-section">
          <span className="edit-user-label-outside">USUARIO: jgonzales</span>
        </div>

        <form className="edit-profile-form" onSubmit={handleSave}>
          <label className="edit-info-label-outside">CONTRASEÑA:</label>
          <div className="edit-info-card">
            {" "}
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="edit-password-field-value"
              placeholder="**********"
            />
          </div>

          <label className="edit-info-label-outside">
            CONFIRMAR CONTRASEÑA:
          </label>
          <div className="edit-info-card">
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
              className="edit-password-field-value"
              placeholder="**********"
            />
          </div>

          <label className="edit-info-label-outside">NOMBRE COMPLETO:</label>
          <div className="edit-info-card">
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
              className="edit-info-value"
              placeholder="Jhefferson Gonzales Prada"
            />
          </div>

          <label className="edit-info-label-outside">TELÉFONO:</label>
          <div className="edit-info-card">
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="edit-info-value"
              placeholder="987654321"
            />
          </div>

          <label className="edit-info-label-outside">CORREO:</label>
          <div className="edit-info-card">
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="edit-info-value"
              placeholder="jgonzales.22@gmail.com"
            />
          </div>

          <label className="edit-info-label-outside">NÚMERO DE SOAT:</label>
          <div className="edit-readonly-card">
            {" "}
            <div className="edit-readonly-value">{userData.soatNumber}</div>
          </div>

          <label className="edit-info-label-outside">LICENCIA:</label>
          <div className="edit-readonly-card">
            <div className="edit-readonly-value">{userData.license}</div>
          </div>

          <label className="edit-info-label-outside">PLACA DEL VEHÍCULO:</label>
          <div className="edit-readonly-card">
            <div className="edit-readonly-value">{userData.vehiclePlate}</div>
          </div>

          <div className="edit-profile-buttons">
            <button type="submit" className="edit-btn-save">
              GUARDAR
            </button>

            <button
              type="button"
              className="edit-btn-logout"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
