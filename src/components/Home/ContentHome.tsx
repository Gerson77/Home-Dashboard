import { SectionNeon } from "./SectionNeon";
import styles from "./css/ContentHome.module.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export function ContentHome() {
  return (
    <div>
      <section className={styles.bannerPrincipal}>
        <div className={styles.overlayHome}></div>
          <section className={styles.bannerInfo}>
            <h2>Cadastre-se para consulta</h2>
            <Link to="/contato">
              Cadastrar
            </Link>
          </section>
      </section>
      <section className={styles.descricaoAutor}>
        <div className={styles.autorUser}>
          <img src="https://github.com/Gerson77.png" />
          <h2>Gerson Santos</h2>
        </div>
        <div className={styles.descricaoConteudo}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque ut urna dictum, molestie risus non, mollis est.
            Phasellus cursus risus libero, quis fermentum risus accumsan sed.
            Pellentesque ut tristique nisi. Proin vulputate posuere eros.
            Quisque pretium cursus porta. Ut at molestie ipsum, in mollis justo.
            Maecenas ante dolor, aliquam in arcu vel, facilisis hendrerit lacus.
            Pellentesque non sagittis libero, vitae fermentum enim. Donec nec
            laoreet mi. Donec sollicitudin, felis at sollicitudin convallis,
            urna neque ullamcorper magna, in cursus magna nulla sed magna. Donec
            tincidunt lacus erat, eu rhoncus eros molestie et. Nam non risus nec
            neque laoreet dapibus. Sed quis laoreet neque.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            maxime deserunt totam sint tempora quo rerum est fugiat recusandae,
            et error! Laboriosam tempora animi saepe nulla excepturi sint
            laudantium facere!Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Magnam, maxime deserunt totam sint tempora quo
            rerum est fugiat recusandae, et error! Laboriosam tempora animi
            saepe nulla excepturi sint laudantium facere!Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Magnam, maxime deserunt totam
            sint tempora quo rerum est fugiat recusandae, et error! Laboriosam
            tempora animi saepe nulla excepturi sint laudantium facere!
          </p>
        </div>
      </section>

      <section className={styles.especialidades}>
        <div>
          <SectionNeon />
        </div>
      </section>
      <section className={styles.extras}>
        <div className={styles.mediaSociais}>
          <h2>Redes sociais</h2>
          <div className={styles.redesSociais}>
            <div>
              <FaInstagram />
            </div>
            <div>
              <a target="_blank" href="https://github.com/Gerson77">
                <FaGithub />
              </a>
            </div>
            <div>
              <FaLinkedin />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
