import { createSelector } from "@ngrx/store";
import { AppState, Todo, TodoState } from "../model/todo.model";


// From app's state collections, only select todos state
export const selectTodos = (state: AppState) => state.todos;

// Method to claim todos in store with createSelector()
export const selectAllTodos = createSelector(
    selectTodos, 
    (state: TodoState) => state.todos //state is from selectTodos above
);

export const selectTodoStatus = createSelector(
    selectTodos,
    (state: TodoState) => state.status
);
