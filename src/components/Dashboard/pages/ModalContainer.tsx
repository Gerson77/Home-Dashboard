import styles from "../css/Modal.module.css";
import { FiInfo } from "react-icons/fi";

type propsInfo = {
  userId: string;
  userName: string;
  modalOpen: any;
  actionUser: any;
  title: string
  text: string
  titleBtn: string
};

const ModalContainer = ({
  userId,
  userName,
  modalOpen,
  actionUser,
  title,
  text,
  titleBtn
}: propsInfo) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <FiInfo />
        <h2>{title}</h2>
        <p>{text} <strong>{userName}</strong>?</p>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.btnEdit}`}
            onClick={() => actionUser(userId)}
          >
            {titleBtn}
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
