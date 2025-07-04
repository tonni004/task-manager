import {Checkbox, Card, CardBody, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import './TodoItem.scss';
import type {Todo} from "../types/types.ts";
import {EditButton} from "./EditButton.tsx";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => Promise<void>;
  toggleCompletion: (todoId: string) => Promise<void>;
  onModalOpen: (todo: Todo) => void;
}

export default function TodoItem({ todo, deleteTodo, toggleCompletion, onModalOpen }: TodoItemProps) {
  const formatDate = (date: Date) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  return (
    <motion.li
      className="TodoItem"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 } }}
      exit={{ opacity: 0 }}>
      <Card>
        <CardBody>
          <p className="ItemData">{formatDate(todo.createdAt)}</p>
          <div className='EditField'>
            <Button
              size='sm'
              className='EditBtn'
              aria-label="Edit Button"
              color='default'
              isIconOnly
              onPress={() => onModalOpen(todo)}>
              <EditButton />
            </Button>
          </div>

          <div className='CheckboxField'>
            <Checkbox
              radius="full"
              color="success"
              isSelected={todo.completed}
              onChange={() => toggleCompletion(todo.id)}
            >
              <div className={`CheckboxDescription ${todo.completed ? 'completed' : ''}`}>
                <p className='Title'>{todo.title}</p>
                <p className="Description">{todo.description}</p>
              </div>
            </Checkbox>
          </div>
          <div className='ButtonField'>
            <Button
              className='DeleteBtn'
              color='danger'
              size="sm"
              onPress={() => deleteTodo(todo.id)}>
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.li >
  )
}
