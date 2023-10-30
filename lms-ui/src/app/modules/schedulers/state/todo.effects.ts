import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, Todo } from '../model/todo.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosSuccess } from './todo.actions';
import { delay, map, of, switchMap } from 'rxjs';

const dummyTodos: Todo[] = [
  { id: '1', content: 'Buy milk' },
  { id: '2', content: 'Buy eggs' },
];

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  // run when loadTodos action is dispatched
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        of(dummyTodos).pipe(
          delay(2000),
          map(
            (todos: Todo[]) => loadTodosSuccess({ todos })
            //with real service: catchError((error) => of(loadTodosFailure({ error })))
          )
        )
      )
    )
  );

  // with real service:
  // Run this code when the addTodo or removeTodo action is dispatched
  //   saveTodos$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(addTodo, removeTodo),
  //         withLatestFrom(this.store.select(selectAllTodos)),
  //         switchMap(([action, todos]) => from(this.todoService.saveTodos(todos)))
  //       ),
  //     // Most effects dispatch another action, but this one is just a "fire and forget" effect
  //     { dispatch: false }
  //   );
}
