import { FaAddressCard, FaCamera } from "react-icons/fa";
import styles from "../css/Content.module.css";
import { Loading } from "../../Home/Loading";
import { useContext, useState } from "react";
import { useApi } from "../../../hooks/useApi/useApi";
import useAlertBox from "../../../hooks/useAlert/useAlert";
import useLoading from "../../../hooks/useLoading/useLoading";
import { BoxAlert } from "../../Home/BoxAlert";
import { useSelector } from "react-redux";
import { RootState } from "../../../main";

export function PerfilUser() {
  const { user, token } = useSelector((state: RootState) => state);
  // const token = useSelector((state: RootState) => state.token)

  const api = useApi();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");

  const { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert } =
    useAlertBox();
  const { loading, setLoading } = useLoading();

  async function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (!name || !email) {
      setAlert(true);
      setAlertInfo({
        status: false,
        title: "Oops...",
        text: "Campo inválido",
      });
    } else if (!password) {
      setAlert(true);
      setAlertInfo({
        status: false,
        title: "Invalido!",
        text: "Digite sua senha para continuar",
      });
    } else {
      const userId = api
        .editUser(
          `user/${user.id}`,
          {
            name,
            email,
            password,
          },
          token
        )
        .then((res) => {
          setLoading(true);
          setAlert(true);
          setAlertInfo({
            status: true,
            title: "Sucesso!",
            text: `Usuário ${res.data.name} editado com sucesso`,
          });
          setLoading(false);
          setName(user?.name);
          setEmail(user?.email);
          setPassword("");
        })
        .catch((err) => {
          setAlert(true);
          setAlertInfo({
            status: false,
            title: "Erro ao editar",
            text: `${err.response.data}`,
          });
        });
      return userId;
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
      {loading && <Loading />}
      <div className={styles.boxContent}>
        <h2>
          <FaAddressCard /> Editar Perfil
        </h2>
        <form>
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
            name={user?.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            name={user?.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            name={user?.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Editar" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
