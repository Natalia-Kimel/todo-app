import React from 'react';
import { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo}) => {
  return (
    <div className='task-item'>
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <label htmlFor={`todo-${todo.id}`} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </label>
    </div>
  );
};

export default TodoItem;