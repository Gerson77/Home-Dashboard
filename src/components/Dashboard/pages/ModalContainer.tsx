import { FaInfo } from "react-icons/fa";
import styles from "../css/Modal.module.css";

type propsInfo = {
  userId: string;
  userName: string;
  modalOpen: any;
  actionUser: any;
};

const ModalContainer = ({ userId, userName, modalOpen, actionUser }: propsInfo) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <FaInfo />
        <h2>Excluir</h2>
        <p>Deseja excluir o usuário {userName}?</p>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.btnEdit}`}
            onClick={() => actionUser(userId)}
          >
            Sim, deletar
          </button>
          <button
            className={`${styles.btn} ${styles.btnDel}`}
            onClick={modalOpen}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
