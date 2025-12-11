import { HeaderVolver } from "../../components/shared/HeaderVolver";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "../../styles/profile/Profile.css";

export const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "Jhefferson",
    lastName: "Gonzales Prada",
    username: "jgonzales",
    password: "**********",
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

        initials: getInitials(
          parsedData.fullName ||
            parsedData.firstName + " " + parsedData.lastName
        ),
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

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
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
    <div className="profile-page">
      <HeaderVolver onBack={handleBack} />

      <div className="profile-logo">
        <h1 className="profile-title-h1">Chaskys</h1>
        <p className="profile-subtitle">Delivery app</p>
      </div>

      <div className="profile-container">
        <div className="profile-top-section">
          <div className="profile-photo-section">
            <div className="profile-img-container">
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
                <div className="profile-initials">
                  {userData.initials || getInitials(userData.fullName)}
                </div>
              )}
            </div>
            <label className="profile-change-photo-btn">
              cambiar foto
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="profile-name-section">
            <h2 className="profile-name">
              {userData.firstName} {userData.lastName}
            </h2>
          </div>
        </div>

        <div className="profile-level-rating-container">
          <div className="profile-level-and-menu-container">
            <div
              onClick={handleRedirectLevels}
              className="profile-chaskys-level-card"
            >
              <div className="profile-level-left">
                <span className="profile-level-text">
                  Nivel: Chaskys Silver
                </span>
              </div>
            </div>

            <button
              onClick={handleRedirectLevels}
              className="profile-menu-dots-btn"
            >
              <Icon icon="mdi:dots-horizontal" width="32" height="32" />
            </button>
          </div>

          <div className="profile-rating-display">
            <span className="profile-rating-label">CALIFICACIÓN</span>
            <span className="profile-rating-number">4.6</span>
          </div>
        </div>

        <div className="profile-user-outside-section">
          <div className="profile-user-label-outside">
            USUARIO: {userData.username}
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-info-label-outside">CONTRASEÑA:</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.password}</span>
          </div>

          <div className="profile-info-label-outside">NOMBRE COMPLETO:</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.fullName}</span>
          </div>

          <div className="profile-info-label-outside">TELÉFONO:</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.phone}</span>
          </div>

          <div className="profile-info-label-outside">CORREO:</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.email}</span>
          </div>

          <div className="profile-info-label-outside">NÚMERO DE SOAT</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.soatNumber}</span>
          </div>

          <div className="profile-info-label-outside">LICENCIA:</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.license}</span>
          </div>

          <div className="profile-info-label-outside">PLACA DEL VEHÍCULO:</div>
          <div className="profile-info-card">
            <span className="profile-info-value">{userData.vehiclePlate}</span>
          </div>
        </div>

        <div className="profile-buttons">
          <button className="profile-btn-edit" onClick={handleEdit}>
            EDITAR
          </button>

          <button className="profile-btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};
