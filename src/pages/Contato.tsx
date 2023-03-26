import { FaBusinessTime, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import styles from "./css/Contato.module.css";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import React, { useCallback, useState } from "react";
import Input from "../components/Home/Input/Input";
import useAlertBox from "../hooks/useAlert/useAlert";
import useLoading from "../hooks/useLoading/useLoading";
import { useApi } from "../hooks/useApi/useApi";
import { BoxAlert } from "../components/Home/BoxAlert";
import { Loading } from "../components/Home/Loading";
import { useNavigate } from "react-router-dom";

interface Client {
  phone: string;
}

export function Contato() {
  const [phone, setNumberPhone] = useState({} as Client || null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const api = useApi();
  const navigate = useNavigate()

  const { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert } =
    useAlertBox();
  const { loading, setLoading } = useLoading();


  async function handleSubmit(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    if (!name || !email || !phone) {
      setAlert(true);
      setAlertInfo({
        status: false,
        title: "Oops...",
        text: "Campo inválido",
      });
    } else {
      const user = api
        .addClient("client", {
          name,
          email,
          phone: phone.phone,
          status: false
        })
        .then(async(res) => {
          setLoading(true);
          let timer: number;
          timer = setInterval(() => {
            setLoading(false);
            navigate("/");
            clearInterval(timer);
          }, 500);
        })
        .catch((err) => {
          setAlert(true);
          setAlertInfo({
            status: false,
            title: "Erro ao cadastrar",
            text: `${err.response.data}`,
          });
        });
      return user;
    }
  }

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setNumberPhone({
        ...phone,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [phone]
  );

  return (
    <div className={styles.containerForm}>
      {alert && (
        <BoxAlert
          event={hiddenBoxAlert}
          status={alertInfo.status}
          title={alertInfo.title}
          text={alertInfo.text}
        />
      )}
      {loading && <Loading/> }
      <Header />
      <section className={styles.overlayForm}>
        <section className={styles.boxDescription}>
          <h2>
            <FaBusinessTime /> Tem interesse ?
          </h2>
          <p>
            <strong>Ficou interessado em nosso serviço? </strong> Em nossa
            empresa realizamos orçamento sem compromisso e totalmente
            gratuito.Cadastre-se em nosso site para que possamos marcar um
            agendamento de nosso serviço.
          </p>
        </section>
        <div className={styles.boxForm}>
          <div className={styles.painel}>
            <h2>Cadastro de Cliente</h2>
            <div className={styles.form}>
              <label>
                <FaUser /> Nome:
              </label>
              <input
                type="text"
                placeholder="Digite seu nome..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyEnter}
              />
              <label>
                <FaEnvelope /> Email:
              </label>
              <input
                type="email"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyEnter}
              />
              <label>
                <FaPhone /> Telefone:
              </label>
              <div>
                <Input
                  placeholder="(99) 99999-9999"
                  name="phone"
                  onChange={handleChange}
                  max={11}
                  onKeyDown={handleKeyEnter}
                />
              </div>
              <input type="submit" value="Enviar" onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
