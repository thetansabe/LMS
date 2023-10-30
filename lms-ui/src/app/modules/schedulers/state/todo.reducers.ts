import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  loadTodos,
  loadTodosSuccess,
  removeTodo,
  updateTodo,
} from './todo.actions';
import { Todo, TodoState } from '../model/todo.model';

export const initialState: TodoState = {
  todos: [],
  error: '',
  status: 'pending',
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { content }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now().toString(), content }],
  })),
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  on(loadTodos, (state) => ({ ...state, status: 'loading' })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    error: '',
    status: 'success',
  })),
  on(updateTodo, (state, { id, newContent }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { id: Date.now().toString(), content: newContent } : todo
    ),
  }))
);
