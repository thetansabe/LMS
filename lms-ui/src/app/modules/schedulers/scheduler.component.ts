import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { selectAllTodos, selectTodoStatus } from './state/todo.selectors';
import { AppState, Todo } from './model/todo.model';
import {
  addTodo,
  loadTodos,
  removeTodo,
  updateTodo,
} from './state/todo.actions';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, LoadingComponent],
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent {
  allTodos$ = this.getTodos();
  todoStatus$ = this.store.select<string>(selectTodoStatus);
  todo = '';
  searchContent$ = new Subject<string>();
  
  //provide <AppState> to constructor for Store's type isolation
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());

    this.searchContent$.pipe(
      debounceTime(500), 
      distinctUntilChanged(),
      tap((content: string) => console.log('searching for: ', content)),
    ).subscribe((content: string) => {
      this.allTodos$ = this.getTodos(content);
    });
  }

  getTodos(searchInput: string = ''){
    return this.store.select<Todo[]>(selectAllTodos)
      .pipe(
        map((todos: Todo[]) => {
          if(searchInput === '') return todos;
          return todos.filter((todo: Todo) => todo.content.includes(searchInput));
        })
      );
  }

  addTodo() {
    console.log('new content: ', this.todo);
    this.store.dispatch(addTodo({ content: this.todo }));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }

  searchTodos(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchContent$.next(input.value);
  }

  updateTodo(event: Event){
    const btn = event.target as HTMLButtonElement;
    const input = btn
      .parentElement
      ?.parentElement
      ?.querySelector('.todo-text') as HTMLInputElement;

    this.store.dispatch(updateTodo({ id: btn.id, newContent: input.value }));
  }
}
