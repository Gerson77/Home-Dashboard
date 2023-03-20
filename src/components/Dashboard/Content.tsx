import styles from "../Dashboard/css/Content.module.css";
import { FaUsers } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import useGetAll from "../../hooks/useGetAll/useGetAll";
import { Loading } from "../Home/Loading";

export function Content() {
  const { result, loading } = useGetAll('clients')
  const clients = result.slice(0, 6)
  
  const usersLimt = useGetAll('users')  
  const users = usersLimt.result.slice(0, 6)

  return (
    <div className={styles.containerContent}>
      {loading && <Loading />}
      <div className={styles.boxContent}>
        <h2>
          <MdDashboard /> Painel de controle - Station Code
        </h2>
        <div className={styles.card}>
          <div className={styles.boxCard}>
            <h2>Clientes cadastrados</h2>
            <p>{result.length}</p>
          </div>
          <div className={styles.boxCard}>
            <h2>Clientes atendidos</h2>
            <p>10</p>
          </div>
          <div className={styles.boxCard}>
            <h2>Clientes em espera</h2>
            <p>8</p>
          </div>
        </div>
      </div>
      {/* Users */}
      <div className={styles.boxContent}>
        <h2>
          <FaUsers /> Usuários do painel
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
          </div>

          {users.map((user) => (
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
            </div>
          ))}
        </div>
        <div className={styles.more}>
          <Link className={styles.btn} to="/dashboard/list-users">
            Ver mais
          </Link>
        </div>
      </div>
      {/* Clients */}
      <div className={styles.boxContent}>
        <h2>
          <FaUsers /> Clientes Cadastrados
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
              <span>Telefone</span>
            </div>
            <div className={styles.col}>
              <span>Data</span>
            </div>
          </div>

          {clients.map((client) => (
            <div className={styles.row} key={client.id}>
              <div className={styles.col}>
                <span>{client.name}</span>
              </div>
              <div className={styles.col}>
                <span>{client.email}</span>
              </div>
              <div className={styles.col}>
                <span>{client.isAdmin}</span>
              </div>
              <div className={styles.col}>
                <span>{client.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.more}>
          <Link className={styles.btn} to="/dashboard/list-clients">
            Ver mais
          </Link>
        </div>
      </div>
    </div>
  );
}
