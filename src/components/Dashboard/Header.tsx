import styles from "../Dashboard/css/Header.module.css";
import { FaBars, FaHouseUser } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

import { Link } from "react-router-dom";
// @ts-ignore
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";

type PropsHeader = {
  event: React.MouseEventHandler<HTMLDivElement>;
};

export function Header({ event }: PropsHeader) {
  const dispatch = useDispatch();

  return (
    <div className={styles.top}>
      <div className={styles.center}>
        <div className={styles.menuBtn}>
          <div onClick={event} className={styles.btnMenu}>
            <div className={styles.btnMenu}></div>
            <div className={styles.btnMenu}></div>
            <div className={styles.btnMenu}></div>
          </div>
        </div>
        <div className={styles.loggout}>
          <Link to="/dashboard">
            <FaHouseUser /> Página inicial
          </Link>
          <Link to="/">
            <GiExitDoor onClick={() => dispatch(setLogout())} />
          </Link>
        </div>
      </div>
    </div>
  );
}
