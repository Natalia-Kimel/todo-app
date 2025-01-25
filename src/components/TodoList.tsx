import React from 'react';
import { Todo } from '../hooks/useTodos';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo}) => {
  return (
    <div>
      {todos.length !== 0 ? todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
      )) : 'There are no tasks for today'
      }
    </div>
  );
};

export default TodoList;