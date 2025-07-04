import { useState } from 'react';
import { motion } from "framer-motion"
import { Input, Button } from "@heroui/react";
import { v4 as uuidv4 } from 'uuid';
import './TodoForm.scss';
import type {Todo} from "../types/types.ts";

interface TodoFormProps {
  addTodo: (newTodo: Todo) => Promise<void>;
}

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

    const newTodo = {
      id: uuidv4(),
      title: title,
      description: description,
      completed: false,
      createdAt: new Date(),
    }

    addTodo(newTodo);
    handleReset();
  }
  return (
    <motion.form
      className="TodoForm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}>
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
        placeholder="Write a task description" />
      <div className='ButtonField'>
        <Button
          className="SubmitBtn"
          type='submit'
          radius='sm'
          color="success"
          variant="ghost"
        >Submit</Button>
        <Button
          className="ResetBtn"
          type='button'
          radius='sm'
          onPress={handleReset}
          color="default"
          variant="ghost"
        >Reset</Button>
      </div>
    </motion.form>
  )
}
