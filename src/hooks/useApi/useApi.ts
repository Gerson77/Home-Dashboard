import axios from "axios";
import { AddUser } from "../../types/Adduser";
import { EditUser } from "../../types/EditUser";
import { AddClient } from "../../types/AddClient";

const api = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL,
});

export const useApi = () => ({
  validateToken: async (email: string, token: string) => {
    const response = await api.post("/validate", { email, token });
    return response.data;
  },

  signin: async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  },

  getAllData: async (route: string, token: string) => {
    const response = await api.get(`/${route}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  getById: async (route: string, token: string) => {
    const response = await api.get(`/${route}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  addUser: async (route: string, { name, email, password }: AddUser, token: string) => {
    const response = await api.post(`/${route}`, {
      name,
      email,
      password,
      isAdmin: false,
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  editUser: async (route: string, { name, email, password }: EditUser, token: string) => {
    const response = await api.put(`/${route}`, { name, email, password },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  deleteUser: async (route: string, token: string) => {
    const response = await api.delete(`/${route}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  addClient: async (route: string, { name, email, phone }: AddClient) => {
    const response = await api.post(`/${route}`, { name, email, phone });
    return response;
  },

  updateClient: async (route: string, { status }: AddClient, token: string) => {
    const response = await api.put(`/${route}`, { status }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
});
