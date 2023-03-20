import { FaAddressCard, FaCamera } from "react-icons/fa";
import styles from "../css/Content.module.css";
import { useState } from "react";
import { useApi } from "../../../hooks/useApi/useApi";
import { BoxAlert } from "../../Home/BoxAlert";
import useAlertBox from "../../../hooks/useAlert/useAlert";
import { Loading } from "../../Home/Loading";
import useLoading from "../../../hooks/useLoading/useLoading";
import { useSelector } from "react-redux";

export function AddUser() {
  const api = useApi();
  const token = useSelector((state: any) => state.token)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert } =
    useAlertBox();
  const { loading, setLoading } = useLoading()

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!name || !email || !password) {
      setAlert(true);
      setAlertInfo({
        status: false,
        title: "Oops...",
        text: "Campo inválido",
      });
    } else {
      const user = api
        .addUser("users", {
          name,
          email,
          password,
          isAdmin: false,
        }, token)
        .then((res) => {
          setLoading(true)
          setAlert(true);
          setAlertInfo({
            status: true,
            title: "Sucesso!",
            text: `Usuário ${res.data.name} cadastrado com sucesso`,
          });
          setLoading(false)
          setName('')
          setEmail('')
          setPassword('')
        })
        .catch((err) => {
          setAlert(true);
          setAlertInfo({
            status: false,
            title: "Erro ao cadastrar",
            text: `${err.response.data}`,
          });
        });
      return user;
    }
  }

  return (
    <div className={styles.containerContent}>
      {alert && (
        <BoxAlert
          event={hiddenBoxAlert}
          status={alertInfo.status}
          title={alertInfo.title}
          text={alertInfo.text}
        />
      )}
      {loading && <Loading /> }
      <div className={styles.boxContent}>
        <h2>
          <FaAddressCard /> Adicionar usuário
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.image}>
            <img src="https://ps.w.org/simple-user-avatar/assets/icon-256x256.png?rev=2413146" />
            <label className={styles.file} htmlFor="img">
              <FaCamera />
            </label>
          </div>
          <input type="file" name="img" id="img" />
          <label htmlFor="">Nome:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="">Selecione o cargos:</label>
          <select name={role} onChange={(e) => setRole(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="administrador">Administrador</option>
          </select>
          <input type="submit" value="Cadastrar" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
