import { useState } from 'react';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<Todo[][]>([]);

  const addTodo = (text: string) => {
    setHistory([...history, todos]);
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setHistory([...history, todos]);
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = () => {
    setHistory([...history, todos]);
    setTodos(todos.filter(todo => !todo.completed));
  };

  const undoLastAction = () => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setTodos(lastState);
      setHistory(history.slice(0, -1));
    }
  };

  return { todos, addTodo, toggleTodo, removeTodo, undoLastAction, history };
};

export default useTodos;