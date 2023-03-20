import styles from "../components/Dashboard/css/Dashboard.module.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { Asidebar } from "../components/Dashboard/Asidebar";
import { Header } from "../components/Dashboard/Header";
import { Content } from "../components/Dashboard/Content";
import { ListUsers } from "../components/Dashboard/pages/ListUsers";
import { ListClients } from "../components/Dashboard/pages/ListClients";
import { AddUser } from "../components/Dashboard/pages/AddUser";
import { PerfilUser } from "../components/Dashboard/pages/PerfilUser";
import { EditUser } from "../components/Dashboard/pages/EditUser";
import { ManagementClients } from "../components/Dashboard/pages/ManagementClients";

export function Dashboard() {
  const [isOpen, setIsOpen] = useState(styles.boxMenu);
  const [isContent, setIsContent] = useState(styles.content);

  function openMenu() {
    isOpen === styles.boxMenu ? setIsOpen(styles.disable) : setIsOpen(styles.boxMenu);
    isContent === styles.content ? setIsContent(styles.contentActive) : setIsContent(styles.content);
  }

  useEffect(() => {
    const changeResize = () => {
      setIsOpen(styles.boxMenu);
      setIsContent(styles.content);
    };
    return window.addEventListener("resize", changeResize);
  }, []);

  return (
    <div className={styles.container}>
      <Asidebar asideStyle={`${styles.boxMenu} ${isOpen}`} />
      <div className={`${styles.content} ${isContent}`}>
        <Header event={openMenu} />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/list-users" element={<ListUsers />} />
          <Route path="/list-clients" element={<ListClients />} />
          <Route path="/management-clients" element={<ManagementClients />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/edit" element={<PerfilUser />} />
        </Routes>
      </div>
    </div>
  );
}
