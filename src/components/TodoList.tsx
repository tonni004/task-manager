import { useState, useEffect } from 'react';
import { Tabs, Tab } from "@heroui/react";
import { ListTemplate } from './ListTemplate';
import { motion } from 'framer-motion';
import './TodoList.scss';
import type {Todo} from "../types/types.ts";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (todoId: string) => Promise<void>;
  onModalOpen: (todo: Todo) => void;
  toggleCompletion: (todoId: string) => Promise<void>;
}

export default function TodoList({ todos, deleteTodo, onModalOpen, toggleCompletion }: TodoListProps) {
  const [sortedTodos, setSortedTodos] = useState(todos);

  const sortTodosByDate = (todos: Todo[], order = 'old') => {
    return todos.slice().sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'old' ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSort = (order: string) => {
    setSortedTodos(sortTodosByDate(todos, order));
  };

  useEffect(() => {
    setSortedTodos(todos);
  }, [todos]);

  return (
    <motion.div
      className="TabsField"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Tabs aria-label="Lists" className="TabsLists" placement='top'>
        <Tab key="allTasks" title="All">
          <ListTemplate
            todos={sortedTodos}
            filterType="all"
            message={`Oops! You don't have any todos`}
            deleteTodo={deleteTodo}
            onModalOpen={onModalOpen}
            onSort={handleSort}
            toggleCompletion={toggleCompletion}
          />
        </Tab>
        <Tab key="completedTasks" title="Completed">
          <ListTemplate
            todos={sortedTodos}
            filterType="completed"
            message={`No completed tasks. Time to check some todos from your list!`}
            deleteTodo={deleteTodo}
            onModalOpen={onModalOpen}
            onSort={handleSort}
            toggleCompletion={toggleCompletion}
          />
        </Tab>
        <Tab key="incompleteTasks" title="Incomplete">
          <ListTemplate
            todos={sortedTodos}
            filterType="incomplete"
            message={`Woow! You don't have any incomplete tasks. Good job!`}
            deleteTodo={deleteTodo}
            onModalOpen={onModalOpen}
            onSort={handleSort}
            toggleCompletion={toggleCompletion}
          />
        </Tab>
      </Tabs>
    </motion.div>
  );
}
