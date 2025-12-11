import { LogoChaskys } from "../../components/shared/LogoChaskys";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/auth/Register.css";

export const Register = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    user: "",
    pass: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("registerStep1", JSON.stringify(form));
    navigate("/register-step2", { state: { formData: form } });
  };

  return (
    <>
      <LogoChaskys descripcion={"Registro Delivery app"} conmotorizado={true} />
      <section className="form-register">
        <form onSubmit={handleSubmit}>
          <div className="form-body">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre Completo"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Teléfono"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="text"
              name="user"
              id="user"
              placeholder="Usuario"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={form.pass}
              onChange={(e) => setForm({ ...form, pass: e.target.value })}
              required
            />
          </div>

          <div className="accion-register">
            <button type="submit" className="btn-siguiente">
              Siguiente
            </button>

            <div className="login-container">
              <span>¿Ya tienes una cuenta?</span>
              <Link to="/login" className="btn-volver-inicio-sesion">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
