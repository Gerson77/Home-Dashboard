import { FaUsers } from "react-icons/fa";
import styles from "../css/ListClients.module.css";
import Modal from "./ModalContainer";
import { useCallback, useEffect, useState } from "react";
import { ResultData } from "../../../types/ResultData";
import { useApi } from "../../../hooks/useApi/useApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../main";

export function ManagementClients() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const api = useApi();
  const token = useSelector((state: RootState) => state.token);
  const [data, setData] = useState<ResultData[]>([]);

  const [searchValue, setSearchValue] = useState("");

  const getAllData = useCallback(async () => {
    return await api
      .getAllData("clients", token)
      .then((res) => {
        const clients = res.data.filter((client: ResultData) => client.status === true);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <div className={styles.containerContent}>
      <div className={styles.boxContent}>
        <div className={styles.boxSearch}>
          <h2>
            <FaUsers /> Clientes concluídos
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
                  className={styles.rowCardSuccess}
                  key={client.id}
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
                    {client.status && (
                      <span>
                        <strong>Status:</strong> Concluído
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          {filteredUser.length === 0 && <p>No User found</p>}
        </div>
      </div>
    </div>
  );
}
