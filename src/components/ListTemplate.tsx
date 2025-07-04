import { ScrollShadow } from "@heroui/react";
import TodoItem from './TodoItem';
import { SortButton } from "./SortButton";
import './ListTemplate.scss';
import type {Todo} from "../types/types.ts";

interface ListTemplateProps {
  todos: Todo[];
  filterType: string;
  message: string;
  deleteTodo: (todoId: string) => Promise<void>;
  onModalOpen: (todo: Todo) => void;
  onSort: (sort: string) => void;
  toggleCompletion : (todoId: string) => Promise<void>;
}

export const ListTemplate = ({ todos, filterType, message, deleteTodo, onModalOpen, onSort, toggleCompletion }: ListTemplateProps) => {
  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filterType) {
      case 'completed':
        return todo.completed;
      case 'incomplete':
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <>
      {filteredTodos.length > 0 ? (
        <div className='TodoListField'>
          <ScrollShadow size={60} className="TodoList">
            <ul>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  onModalOpen={onModalOpen}
                  toggleCompletion={toggleCompletion}
                />
              ))}
            </ul>
          </ScrollShadow>
          <SortButton onSort={onSort} />
        </div>
      ) : (
        <p className="TodoDescriptionText">{message}</p>
      )}
    </>
  )
};
