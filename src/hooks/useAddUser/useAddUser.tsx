import { useState } from "react";

export default function useAddUser(route: string) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function addNewUser() {
    setEmail(email);
    setPassword(password);
    setName(name);
    setRole(role);

    console.log(name, email, password, role);
  }

  return { name, email, password, role, addNewUser };
}
