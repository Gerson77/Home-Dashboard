import styles from "../Dashboard/css/Header.module.css";
import { FaBars, FaHouseUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import { Link } from "react-router-dom";
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";

type PropsHeader = {
  event: any;
};

export function Header({ event }: PropsHeader) {
  const dispatch = useDispatch();

  return (
    <div className={styles.top}>
      <div className={styles.center}>
        <div className={styles.menuBtn}>
          <FaBars onClick={event} />
        </div>
        <div className={styles.loggout}>
          <Link to="/dashboard">
            <FaHouseUser /> Página inicial
          </Link>
          <a href="/login" onClick={() => dispatch(setLogout())}>
            <GiExitDoor />
          </a>
        </div>
      </div>
    </div>
  );
}
