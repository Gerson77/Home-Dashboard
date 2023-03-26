import { FaAddressCard, FaCamera } from "react-icons/fa";
import styles from "../css/Content.module.css";
import { Loading } from "../../Home/Loading";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi/useApi";
import useAlertBox from "../../../hooks/useAlert/useAlert";
import useLoading from "../../../hooks/useLoading/useLoading";
import { BoxAlert } from "../../Home/BoxAlert";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../../main";

export function EditUser() {
  const api = useApi();
  const { id } = useParams<{ id: string }>();
  const token = useSelector((state: RootState) => state.token);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert } =
    useAlertBox();
  const { loading, setLoading } = useLoading();

  const result = async () => {
    const userEdited = await api
      .getById(`user/${id}`, token)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
      });

    return userEdited;
  };
  useEffect(() => {
    result();
  }, []);

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
        text: "Digite a senha para continuar",
      });
    } else {
      const user = api
        .editUser(
          `user/${id}`,
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
          setName(name);
          setEmail(email);
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
      {loading && <Loading />}
      <div className={styles.boxContent}>
        <h2>
          <FaAddressCard /> Editar usuário
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Editar" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
}
