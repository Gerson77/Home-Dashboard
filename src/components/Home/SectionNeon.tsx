import styles from './css/SectionNeon.module.css'
import { FaCss3, FaHtml5, FaNodeJs } from 'react-icons/fa'
import { SiJavascript } from 'react-icons/si'

export function SectionNeon() {
  return (
    <div className={styles.containerNeon}>
      <h2 className={styles.titulo}>Técnologias usadas no desenvolvimento</h2>
      <div className={styles.boxEspecialidade}>
        <section className={styles.boxNeon}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <section className={styles.boxCardEspecialidade}>
            <h3>
              <FaHtml5 />
            </h3>
            <h4>HTML5</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              maxime deserunt totam sint tempora quo rerum est fugiat
              recusandae, et error! Laboriosam tempora animi saepe nulla
              excepturi sint laudantium facere
            </p>
          </section>
        </section>
        <section className={styles.boxNeon}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <section className={styles.boxCardEspecialidade}>
            <h3>
              <FaCss3/>
            </h3>
            <h4>CSS3</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              maxime deserunt totam sint tempora quo rerum est fugiat
              recusandae, et error! Laboriosam tempora animi saepe nulla
              excepturi sint laudantium facere
            </p>
          </section>
        </section>
        <section className={styles.boxNeon}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <section className={styles.boxCardEspecialidade}>
            <h3>
              <SiJavascript/>
            </h3>
            <h4>JAVASCRIPT</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              maxime deserunt totam sint tempora quo rerum est fugiat
              recusandae, et error! Laboriosam tempora animi saepe nulla
              excepturi sint laudantium facere
            </p>
          </section>
        </section>
        <section className={styles.boxNeon}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <section className={styles.boxCardEspecialidade}>
            <h3>
              <FaNodeJs />
            </h3>
            <h4>NODE.JS</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              maxime deserunt totam sint tempora quo rerum est fugiat
              recusandae, et error! Laboriosam tempora animi saepe nulla
              excepturi sint laudantium facere
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
