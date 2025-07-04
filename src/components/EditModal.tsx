import { useState } from 'react';
import {Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@heroui/react";
import './TodoForm.scss';
import type {Todo} from "../types/types.ts";

interface TodoFormProps {
  todo: Todo;
  editTodo: (todoId: string, updates: Partial<Todo>) => Promise<void>;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function EditModal({ todo, editTodo, isOpen, onOpenChange }: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title || '');
  const [description, setDescription] = useState(todo?.description || '');

  const handleReset = () => {
    setTitle('');
    setDescription('');
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('Please enter a task title.');
      return;
    }

    const editTask = {
      id: todo?.id,
      title: title,
      description: description,
      completed: todo?.completed || false,
      createdAt: todo?.createdAt,
    }

    editTodo(todo.id, editTask);
    handleReset();
    onOpenChange(false);
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form id="editForm" onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1 text-center">Edit task</ModalHeader>
              <ModalBody>
                <Input
                  className="FormInput"
                  name='title'
                  type='text'
                  autoComplete="off"
                  variant="underlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  required
                />
                <Input
                  className="FormInput"
                  name='description'
                  type='text'
                  autoComplete="off"
                  variant="underlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a task description"/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={() => {
                  handleReset();
                  onClose();
                }}>
                  Close
                </Button>
                <Button color="success" variant="ghost" type="submit">
                  Edit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
