# LMS2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

### This is a draft project so there are some limitations

## Setup
- please delete package-lock.json before npm i
- Convert any .mp4 file to HLS (m3u8 + ts), save them in assets/videos/hls

## Video player

### Dependencies:

```
npm i --save hls.js
npm i plyr
```

### Cautions:

- go to angular.js > build > styles and see library styles imports
- go to src > shared > components > video-player to see implementation

### Achievements:

- partial load
- cool video player UI

## Reactive form:

- Simple implementation & multiple checkboxes selection: src > modules > enrollments > form
- sync and async custom validators: src > modules > auths > register

## Small tricky stuffs:

- select all checkboxes (without reactive form): src > app > modules > carts > cart.component
- infinite scroll - ngx-infinite-scroll: src > app > modules > blogs > blog.component

## NgRx:

- remember to provide dependencies in NgModule: store, effects, ...

- best practice for todos search function: src > app > modules > schedulers > scheduler.component
```typescript
allTodos$ = this.getTodos();

// You should create a filter pipe right in your get data observable
getTodos(searchInput: string = ''){
    return this.store.select<Todo[]>(selectAllTodos)
        .pipe(
            map((todos: Todo[]) => {
                if(searchInput === '') return todos;
                return todos.filter((todo: Todo) => todo.content.includes(searchInput));
            })
        );
}

ngOnInit() {
    // load data to ngrx store
    this.store.dispatch(loadTodos());

    //debounce search and update allTodos$
    //do NOT update data in ngrx store when search
    this.searchContent$.pipe(
      debounceTime(500), 
      distinctUntilChanged(),
      tap((content: string) => console.log('searching for: ', content)),
    ).subscribe((content: string) => {
      this.allTodos$ = this.getTodos(content);
    });
}

searchTodos(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchContent$.next(input.value);
}
```

- best practice for update arrays in ngrx state:
```typescript
//The idea is when work with state, we treat arrays as readonly
//read: https://ngrx.io/guide/store/why#immutability-and-performance
//Instead of mutation using findIndex and replacing using splice, arr[i], we should use map to return new array
on(updateTodo, (state, { id, newContent }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { id: Date.now().toString(), content: newContent } : todo
    ),
}))
```

## Trello:
- Go to src > app > modules > trellos > trello.component
- Drag and drop:
  - dragStart: get the DragEvent when you start to drag.
  - dragable: browser draggable effect.
  - dragOver: get the event when you are dragging.
  - drop: get the event when you drop.
- The idea of trello is to know destination and update the board structure:
  - Board structure: list of columns, each columns has list of tickets
  - Destination#1 - empty column: just push the current dragging ticket into the destinate column.
  - Destination#2 - column with existed tickets: detect nearest ticket using center collision detection and insert the dragging ticket.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
