import { FaEnvelope, FaLock } from "react-icons/fa";
import styles from "./css/Login.module.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { Loading } from "../components/Home/Loading";
import { BoxAlert } from "../components/Home/BoxAlert";
import useAlertBox from "../hooks/useAlert/useAlert";
import { useApi } from "../hooks/useApi/useApi";

// state redux
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

  const handleLogin = async (event: any) => {
    if(event.keyCode === 13) {

      if (!email || !password) {
        setAlertInfo({
          status: false,
          title: "Oops",
          text: "Email/senha vázio",
        });
        setAlert(true);
      } else {
        try {
          const isLogged = await api.signin(email, password);
    
          if (isLogged) {
            dispatch(
              setLogin({
                user: isLogged.user,
                token: isLogged.token,
              })
            );
            setLoading(true);
            let timer: any;
            timer = setInterval(() => {
              setLoading(false);
              navigate("/dashboard");
              clearInterval(timer);
            }, 500);
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
    }
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
                onKeyDown={handleLogin}
              />
              <label>
                <FaLock /> Senha:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha..."
                onKeyDown={handleLogin}
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
