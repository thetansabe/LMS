# LMS2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Limitations
### This is a draft project so there are some limitations:
- cannot routing: coureses/:id
- please delete package-lock.json before npm i

## Video player
### Dependencies:
- npm i --save hls.js
- npm i plyr
### Cautions:
- go to angular.js > build > styles and see library styles imports
- go to src > shared > components > video-player to see implementation
### Achievements:
- partial load
- cool video player UI

## Reactive form
### Cautions:
- Simple implementation: src > modules > enrollments > form
(watch for multiple checkboxes selection)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
