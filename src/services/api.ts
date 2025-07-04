import axios from 'axios';
import type {Todo} from "../types/types.ts";
const API_URL = 'http://localhost:3001/tasks';

export const getTodos = () => axios.get<Todo[]>(API_URL);
export const createTodo = (todo: Todo) => axios.post<Todo>(API_URL, todo);
export const deleteTodoById = (id: string) => axios.delete<void>(`${API_URL}/${id}`);
export const updateTodo = (id: string, updatedTodo: Partial<Todo>) => axios.put<Todo>(`${API_URL}/${id}`, updatedTodo);
