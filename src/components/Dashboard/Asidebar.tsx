import { FaTable, FaUser, FaUsers } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "../Dashboard/css/Asidebar.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../main";

export function Asidebar({ asideStyle }: any) {
  const user = useSelector((state: RootState) => state.user)
  
  return (
    <aside className={asideStyle}>
      <div className={styles.boxImgBack}>
        <div className={styles.boxUser}>
          <div className={styles.boxAvatar}>
            <FaUser />
          </div>
          <div className={styles.nameUser}>
            <FaUser />
            <div className={styles.titleUser}>
              <p>{user?.name}</p>
              <p>
                {user?.isAdmin && <span>Administrador</span>}
                {!user?.isAdmin && <span>Normal</span>}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.itensMenu}>
          <h2>
            <FaTable /> Administração painel
          </h2>
          <Link className="itemMenu" to="/dashboard/add-user">Adicionar usuário</Link>
          <Link className="itemMenu" to="/dashboard/list-users">Listar usuários</Link>
          <Link className="itemMenu" to="/dashboard/edit-user">Editar usuário</Link>
          <h2><FaUsers /> Gestão de clientes</h2>
          <Link className="itemMenu" to="/dashboard/list-clients">Listar clientes</Link>
          <Link className="itemMenu" to="/dashboard/management-clients">Gerenciar clientes</Link>
          <h2>
            <BsGear /> Configuração Geral
          </h2>
          <Link className="itemMenu" to="/dashboard/edit">Editar</Link>
        </div>
      </div>
    </aside>
  );
}
