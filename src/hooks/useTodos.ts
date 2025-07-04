import { useCallback, useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodoById, updateTodo } from '../services/api.ts';
import type { Todo } from "../types/types.ts";

interface Props {
  todos: Todo[];
  addTodo: (newTodo: Todo) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  toggleTodoCompletion: (todoId: string) => Promise<void>;
  editTodo: (todoId: string, updates: Partial<Todo>) => Promise<void>;
}

export const useTodos = (): Props => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = useCallback(async (newTodo: Todo) => {
    try {
      const response = await createTodo(newTodo);
      setTodos((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error('Added error:', error);
    }
  }, []);

  const deleteTodo = useCallback(async (todoId: string) => {
    try {
      await deleteTodoById(todoId);
      setTodos((prev) => prev.filter((todo: Todo) => todo.id !== todoId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  }, []);

  const toggleTodoCompletion = useCallback(async (todoId: string) => {
    const todoToUpdate = todos.find((todo) => todo.id === todoId);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    try {
      await updateTodo(todoId, updatedTodo);
      setTodos((prev) =>
        prev.map((todo: Todo) => (todo.id === todoId ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Toggle error:', error);
    }
  }, [todos]);

  const editTodo = useCallback(async (todoId: string, updates: Partial<Todo>) => {
    const todoToUpdate = todos.find((todo) => todo.id === todoId);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, ...updates };

    try {
      const response = await updateTodo(todoId, updatedTodo);
      setTodos((prev) =>
        prev.map((todo: Todo) => (todo.id === todoId ? response.data : todo))
      );
    } catch (error) {
      console.error('Edit error:', error);
    }
  }, [todos]);

      return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodoCompletion,
        editTodo,
  };
};
