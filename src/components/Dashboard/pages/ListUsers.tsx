import { Link } from "react-router-dom";
import styles from "../css/Content.module.css";
import { useCallback, useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { useSelector } from "react-redux";
import { useApi } from "../../../hooks/useApi/useApi";
import { ResultData } from "../../../types/ResultData";
import { RootState } from "../../../main";

export function ListUsers() {
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const api = useApi();
  const token = useSelector((state: RootState) => state.token);
  const [data, setData] = useState<ResultData[]>([]);

  const modalOpen = (id: string, name: string) => {
    setUserId(id);
    setUserName(name);
    return modal ? setModal(false) : setModal(true);
  };

  const deleteUser = async (id: string) => {
    return api
      .deleteUser(`user/${id}`, token)
      .then((res) => {
        setModal(false);
        getAllData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllData = useCallback(async () => {
    return await api
      .getAllData("users", token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className={styles.containerContent}>
      <div className={styles.boxContent}>
        <h2>
          <i className="fa fa-address-card"></i> Usuários do painel
        </h2>
        <div className={styles.tableResponsive}>
          <div className={styles.row}>
            <div className={styles.col}>
              <span>Nome</span>
            </div>
            <div className={styles.col}>
              <span>Email</span>
            </div>
            <div className={styles.col}>
              <span>Permissão</span>
            </div>
            <div className={styles.col}>
              <span>Ações</span>
            </div>
          </div>
          {data.map((user) => (
            <div className={styles.row} key={user.id}>
              <div className={styles.col}>
                <span>{user.name}</span>
              </div>
              <div className={styles.col}>
                <span>{user.email}</span>
              </div>
              <div className={styles.col}>
                {user.isAdmin && <span>Administrador</span>}
                {!user.isAdmin && <span>Normal</span>}
              </div>
              <div className={styles.col}>
                <button className={styles.btn}>
                  <Link to={`/dashboard/edit-user/${user.id}`}>Editar</Link>
                </button>
                <button
                  className={`${styles.btn} ${styles.btnDel}`}
                  onClick={() => modalOpen(user.id, user.name)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
          {modal && (
            <ModalContainer
            title={'Excluir'}
            text={'Deseja excluir o usuário'}
            titleBtn={'Sim, deletar'}
            userId={userId}
              userName={userName}
              modalOpen={modalOpen}
              actionUser={deleteUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
