import React, { useState } from 'react';
import useTodos from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.scss'
import "@fontsource/playfair-display";

const App: React.FC = () => {
  const { todos, addTodo, toggleTodo, removeTodo, undoLastAction, history } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  return (
    <div className='main-container'>
      <h1>TODOS</h1>
      <div className='container'>
        <TodoInput addTodo={addTodo} />
        <div className='todo-list-container'>
        <TodoList 
          todos={filteredTodos()} 
          toggleTodo={toggleTodo} 
        />
        </div>
        <div className='task-filter'>
          <h2>{`${todos.filter(todo => !todo.completed).length} ${todos.filter(todo => !todo.completed).length === 1 ? 'task left' : 'tasks left'}`}</h2>
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}>
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}>
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}>
            Completed
          </button>
          <button onClick={removeTodo} disabled={todos.filter(todo => todo.completed).length == 0}>
            Clear completed
          </button>
          <button onClick={undoLastAction} aria-label="Назад" disabled={history.length === 0}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.99 511.99" width="20" height="19" fill="#000"><g><path d="M332.789,145.061H29.123L151.089,23.095c3.333-3.333,3.333-8.733,0-12.067c-3.333-3.333-8.733-3.333-12.067,0L2.5,147.551 c-0.792,0.789-1.419,1.735-1.854,2.785c-0.862,2.085-0.862,4.433,0,6.518c0.434,1.05,1.062,1.996,1.854,2.785l136.522,136.522 c1.667,1.667,3.85,2.5,6.033,2.5c2.183,0,4.367-0.833,6.033-2.5c3.333-3.333,3.333-8.733,0-12.067L29.123,162.128h303.667 c89.4,0,162.133,72.733,162.133,162.133S422.19,486.395,332.789,486.395h-153.6c-4.717,0-8.533,3.817-8.533,8.533 s3.817,8.533,8.533,8.533h153.6c98.808,0,179.2-80.392,179.2-179.2S431.598,145.061,332.789,145.061z"/></g></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;