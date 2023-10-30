import { createAction, props } from '@ngrx/store';
import { Todo } from '../model/todo.model';

export const addTodo = createAction(
  '[Scheduler] Add Todo',
  props<{ content: string }>()
);

export const removeTodo = createAction(
  '[Scheduler] Remove Todo',
  props<{ id: string }>()
);

export const loadTodos = createAction('[Scheduler] Load Todos');

export const loadTodosSuccess = createAction(
  '[Scheduler] Todo Load Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Scheduler] Todo Load Failure',
  props<{ error: string }>()
);

export const updateTodo = createAction(
  '[Scheduler] Update Todo',
  props<{ id: string, newContent: string }>()
);