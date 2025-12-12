import { useNavigate } from "react-router-dom";

export const HeaderHome = ({ variant }) => {
  const navigate = useNavigate();

  const handlerRedictProfile = () => {
    navigate("/profile");
  };

  const handlerRedirectLevels = () => {
    navigate("/user-levels");
  };

  return (
    <section
      className={`header-home ${variant === "history" ? "header-history" : ""}`}
    >
      <div className="hader-user">
        <span className="header-user-name" onClick={handlerRedictProfile}>
          Jhefferson
        </span>
        <span
          className="header-user-category color-orange"
          onClick={handlerRedirectLevels}
        >
          Chaskys Silver
        </span>
      </div>

      <div onClick={handlerRedictProfile} className="header-logo">
        <span className="header-logo-name color-orange">Chaskys</span>
        <span className="header-logo-subname">Delivery app</span>
      </div>
    </section>
  );
};
