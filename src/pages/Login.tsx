import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Loading } from "../components/Home/Loading";
import { BoxAlert } from "../components/Home/BoxAlert";
import useAlertBox from "../hooks/useAlert/useAlert";
import { useApi } from "../hooks/useApi/useApi";

import { useDispatch } from "react-redux";
// @ts-ignore
import { setLogin } from "../state";

export function Login() {
  const api = useApi();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert } =
    useAlertBox();

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertInfo({
        status: false,
        title: "Oops",
        text: "Email/senha vázio",
      });
      setAlert(true);
    } else {
      try {
        setLoading(true);
        const isLogged = await api.signin(email, password);

        if (isLogged) {
          dispatch(
            setLogin({
              user: isLogged.user,
              token: isLogged.token,
            })
          );
          setLoading(true);
          setLoading(false);
          navigate("/dashboard");
        }
      } catch (err: any) {
        setAlertInfo({
          status: false,
          title: "Oops",
          text: "Email/senha incorreto",
        });
        setAlert(true);
      }
    }
  };

  const eventCapture = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === 'NumpadEnter') return handleLogin();
  };

  return (
    <div className={styles.containerLogin}>
      <section className={styles.overlayLogin}>
        <div className={styles.login}>
          <div className={styles.painel}>
            <h2>Login</h2>
            <div className={styles.form}>
              <label>
                <FaEnvelope /> Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email..."
                onKeyDown={eventCapture}
              />
              <label>
                <FaLock /> Senha:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha..."
                onKeyDown={eventCapture}
              />
              <input type="submit" value="Enviar" onClick={handleLogin} />
            </div>
          </div>
        </div>
        {alert && (
          <BoxAlert
            event={hiddenBoxAlert}
            status={false}
            title={alertInfo.title}
            text={alertInfo.text}
          />
        )}
        {loading && <Loading />}
      </section>
    </div>
  );
}
