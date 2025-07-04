import TodoForm from './components/TodoForm.tsx'
import TodoList from "./components/TodoList.tsx";
import { useTodos } from "./hooks/useTodos.ts";
import { useDisclosure } from "@heroui/react";
import './output.css';
import './styles/main.scss';
import EditModal from "./components/EditModal.tsx";
import {useState} from "react";
import type {Todo} from "./types/types.ts";

function App() {
  const { todos, addTodo, deleteTodo, toggleTodoCompletion, editTodo } = useTodos();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<Todo>();

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedTodo(undefined);
    onOpenChange();
  };

  return (
    <div className="App">
      <TodoForm addTodo={addTodo}/>
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        onModalOpen={handleOpenModal}
        toggleCompletion={toggleTodoCompletion}/>
      {selectedTodo && <EditModal todo={selectedTodo} editTodo={editTodo} isOpen={isOpen} onOpenChange={handleCloseModal}/>}
    </div>
  )
}

export default App
