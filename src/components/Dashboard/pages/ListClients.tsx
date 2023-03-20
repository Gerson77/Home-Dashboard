import { FaUsers } from "react-icons/fa";
import styles from "../css/ListClients.module.css";
import ModalContainer from "./ModalContainer";
import { useCallback, useEffect, useState } from "react";
import { ResultData } from "../../../types/ResultData";
import { useApi } from "../../../hooks/useApi/useApi";
import { useSelector } from "react-redux";
import { BoxAlert } from "../../Home/BoxAlert";
import useAlertBox from "../../../hooks/useAlert/useAlert";

export function ListClients() {
  const api = useApi();
  const token = useSelector((state: any) => state.token);

  const [isModal, setModal] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [data, setData] = useState<ResultData[]>([]);
  const [isStatus, setIsStatus] = useState(true);

  const { alert, setAlert, alertInfo, setAlertInfo, hiddenBoxAlert } =
    useAlertBox();

  const [searchValue, setSearchValue] = useState("");

  const getAllData = useCallback(async () => {
    return await api
      .getAllData("clients", token)
      .then((res) => {
        const clients = res.data.filter(
          (client: ResultData) => client.status === false
        );
        setData(clients);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const filteredUser = searchValue
    ? data.filter((client) => {
        return client.name.toLowerCase().includes(searchValue.toLowerCase());
      })
    : data;

  useEffect(() => {
    getAllData();
  }, []);

  const modalOpen = (id: string, name: string) => {
    setUserId(id);
    setUserName(name);
    return isModal ? setModal(false) : setModal(true);
  };

   const updateStatusClient = async(id: string) => {
    const clientUpdate = await api
      .updateClient(
        `client/${id}`,
        {
          status: isStatus,
        },
        token
      )
      .then((res) => {
        setModal(false);
        setAlert(true);
        setAlertInfo({
          status: true,
          title: "Sucesso!",
          text: `Atendimento concluído`,
        });
        getAllData();
      })
      .catch((err) => {
        console.log(err);
      });
    return clientUpdate;
  };

  const handleChange = (e: any) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className={styles.containerContent}>
      {alert && (
        <BoxAlert
          event={hiddenBoxAlert}
          status={alertInfo.status}
          title={alertInfo.title}
          text={alertInfo.text}
        />
      )}
      <div className={styles.boxContent}>
        <div className={styles.boxSearch}>
          <h2>
            <FaUsers /> Clientes Cadastrados
          </h2>
          <div>
            <input
              type="search"
              value={searchValue}
              onChange={handleChange}
              placeholder="&#x1F50E;&#xFE0E;Search"
            />
          </div>
        </div>

        <div className={styles.tableResponsive}>
          {filteredUser.length > 0 && (
            <>
              {filteredUser.map((client) => (
                <div
                  className={styles.rowCard}
                  key={client.id}
                  onClick={() => modalOpen(client.id, client.name)}
                >
                  <div className={styles.col}>
                    <span>
                      <strong>Nome:</strong> {client.name}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <span>
                      <strong>Email:</strong> {client.email}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <span>
                      <strong>Telefone:</strong> {client.phone}
                    </span>
                  </div>
                  <div className={styles.col}>
                    <span>
                      <strong>Data:</strong> {client.createdAt}
                    </span>
                  </div>
                  <div className={styles.col}>
                    {!client.status && (
                      <span>
                        <strong>Status:</strong> pendente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          {filteredUser.length === 0 && <p>No User found</p>}
          {isModal && (
            <ModalContainer
              userId={userId}
              userName={userName}
              modalOpen={modalOpen}
              actionUser={updateStatusClient}
            />
          )}
        </div>
      </div>
    </div>
  );
}
