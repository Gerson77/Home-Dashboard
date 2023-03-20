import { FiAlertOctagon, FiCheckCircle } from "react-icons/fi";
import styles from "../Home/css/BoxAlert.module.css";

type AlertData = {
  text: string;
  event: any;
  title: string;
  status: boolean;
};

export function BoxAlert({ status, title, text, event }: AlertData) {
  return (
    <div className={styles.containerAlert}>
      <div className={styles.boxAlert}>
        {status ? <FiCheckCircle className={styles.alertIconSuccess} /> : <FiAlertOctagon className={styles.alertIconError} />}
        <h2>{title}</h2>
        <p>{text}</p>
        <button onClick={event}>OK</button>
      </div>
    </div>
  );
}
