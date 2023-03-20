import { Link } from "react-router-dom";
import { Header } from "../components/Home/Header";
import styles from "./css/404.module.css";

import { TiArrowBack} from 'react-icons/ti'
import { BsEmojiDizzy } from "react-icons/bs";

const Route404 = () => {
  return (
    <>
      <Header />
      <div className={styles.centerNotFound}>
        <BsEmojiDizzy />
        <h2><strong>Página não encontrada.</strong></h2>
        <p>
          <Link to="/"><TiArrowBack />Back - Retorne para Home</Link>
        </p>
      </div>
    </>
  );
};

export default Route404;
