import axios from "axios";
import { Task, Category } from "../types";

const API_URL = "http://localhost:3000"; // json-server

export const getTasks = () => axios.get<Task[]>(`${API_URL}/tasks`);
export const getCategories = () => axios.get<Category[]>(`${API_URL}/categories`);
export const updateTask = (id: string, data: Partial<Task>) => {
  return axios.patch(`${API_URL}/tasks/${id}`, data);
};
export const createTask = (data: Omit<Task, "id">) =>
  axios.post(`${API_URL}/tasks`, data);
