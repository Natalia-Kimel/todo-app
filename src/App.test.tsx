import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('добавление задачи', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Новая задача' } });
  fireEvent.click(button);

  expect(screen.getByText('Новая задача')).toBeInTheDocument();
});


test('переключение состояния задачи', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.click(button);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(screen.getByText('Задача')).toHaveStyle('text-decoration: line-through');
});


test('фильтрация задач', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Задача 1' } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: 'Задача 2' } });
  fireEvent.click(button);

  const activeButton = screen.getByText(/Active/i);
  fireEvent.click(activeButton);

  expect(screen.getByText('Задача 1')).toBeInTheDocument();
  expect(screen.getByText('Задача 2')).toBeInTheDocument();

  const completedCheckbox = screen.getByRole('checkbox', { name: 'Задача 1' });
  fireEvent.click(completedCheckbox);

  const completedButton = screen.getByText('Completed');
  fireEvent.click(completedButton);

  expect(screen.getByText('Задача 1')).toBeInTheDocument();
  expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
});


test('отображение количества оставшихся задач', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Задача 1' } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: 'Задача 2' } });
  fireEvent.click(button);

  const activeCount = screen.getByText(/tasks left/i);
  expect(activeCount).toHaveTextContent('2 tasks left');

  const checkbox = screen.getByRole('checkbox', { name: 'Задача 1' });
  fireEvent.click(checkbox);

  expect(activeCount).toHaveTextContent('1 task left');
});


test('отмена последнего действия', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.click(button);

  const undoButton = screen.getByLabelText('Назад');
  fireEvent.click(undoButton);

  expect(screen.queryByText('Задача')).not.toBeInTheDocument();
});


test('отображение состояния кнопки "Назад"', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Задача' } });
  fireEvent.click(button);

  const undoButton = screen.getByLabelText('Назад');
  expect(undoButton).toBeEnabled();
});


test('удаление всех завершенных задач', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/New task/i);
  const button = screen.getByText(/Add to the list/i);

  fireEvent.change(input, { target: { value: 'Задача 1' } });
  fireEvent.click(button);
  fireEvent.change(input, { target: { value: 'Задача 2' } });
  fireEvent.click(button);

  const checkbox1 = screen.getByRole('checkbox', { name: 'Задача 1' });
  fireEvent.click(checkbox1);

  const clearButton = screen.getByText(/Clear completed/i);
  fireEvent.click(clearButton);

  expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  expect(screen.getByText('Задача 2')).toBeInTheDocument();
});


test('удаление всех завершенных задач невозможно при их отсутствии', () => {
  render(<App />);
  const clearButton = screen.getByText(/Clear completed/i);
  expect(clearButton).toBeDisabled();
});


test('отображение сообщения при отсутствии задач', () => {
  render(<App />);
  const message = screen.getByText(/There are no tasks for today/i);
  expect(message).toBeInTheDocument();
});