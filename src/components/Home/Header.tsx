import { Link } from "react-router-dom";
import styles from "./css/Header.module.css";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";

export function Header() {
  const [isMobile, setIsMobile] = useState(styles.mobile);
  const textTitle = "</> Station Code";

  function menuOpen() {
    isMobile === styles.mobile
      ? setIsMobile(styles.mobileActive)
      : setIsMobile(styles.mobile);
  }

  useEffect(() => {
    const changeResize = () => {
      setIsMobile(styles.mobile);
    };
    return window.addEventListener("resize", changeResize);
  }, []);

  return (
    <div className={styles.containerNav}>
      <div className={styles.titleNav}>
        <h1>{textTitle}</h1>
      </div>
      <div className={styles.listMenu}>
        <ul className={styles.listItem}>
          <li>
            <Link className={styles.item} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.item} to="/contato">
              Contato
            </Link>
          </li>
          <li>
            <Link className={styles.item} to="/login">
              Login
            </Link>
          </li>
        </ul>
        <FaBars onClick={menuOpen} />
      </div>
      <div className={`${styles.mobile} ${isMobile}`}>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/contato">Contato</Link>
        </ul>
      </div>
    </div>
  );
}
