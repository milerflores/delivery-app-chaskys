import { useState } from "react";
import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "../../styles/auth/Login.css";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUser = "admin";
    const validPassword = "123456";

    if (user === validUser && password === validPassword) {
      navigate("/home");
    }
  };

  return (
    <>
      <LogoChaskys descripcion={"Delivery app"} conmotorizado={true} />

      <form onSubmit={handleSubmit} className="login-form">
        <section className="inputs-form">
          <div className="input-icon">
            <span>
              <Icon icon="fa7-regular:user" width="30" height="30" />
            </span>
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Usuario"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="input-icon">
            <span>
              <Icon icon="solar:lock-password-bold" width="27" height="27" />
            </span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </section>

        <section className="accion-login">
          <Link to="/forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>

          <button type="submit" className="btn btn-login">
            Iniciar Sesión
          </button>
          <span>o</span>
          <Link to="/register" className="btn btn-create-account">
            Crea una cuenta
          </Link>
        </section>
      </form>
    </>
  );
};
