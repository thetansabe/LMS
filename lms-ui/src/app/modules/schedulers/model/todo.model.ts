//define a Todo
export interface Todo {
  id: string;
  content: string;
}

//define a Todo with its status
export interface TodoState {
  todos: Todo[];
  error: string;
  status: string;
}

//define app's current state, storing latest TodoState object
export interface AppState {
    todos: TodoState;
    // other states: UserState, ArticleState, etc...
}
