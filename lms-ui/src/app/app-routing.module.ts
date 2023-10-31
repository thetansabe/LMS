import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/homepage.component').then(
        (m) => m.HomepageComponent
      ),
  },

  {
    path: 'courses',
    loadComponent: () =>
          import('./modules/courses/main-view/course-main-view.component').then(
            (m) => m.CourseMainViewComponent
          ),

    children: [
      {
        path: ':chapterId/:videoId',
        loadComponent: () =>
          import('./modules/courses/lesson-detail/course-lesson-detail.component').then(
            (m) => m.CourseLessonDetailComponent
          ),
      },
    ],
  },

  {
    path: 'enrollments',
    loadComponent: () =>
      import('./modules/enrollments/form/enrollment-form.component').then(
        (m) => m.EnrollmentFormComponent
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./modules/auths/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'carts',
    loadComponent: () =>
          import('./modules/carts/cart.component').then(
            (m) => m.CartComponent
          ),
  },

  {
    path: 'blogs',
    loadComponent: () =>
          import('./modules/blogs/blog.component').then(
            (m) => m.BlogComponent
          ),
  },

  {
    path: 'schedulers',
    loadComponent: () =>
          import('./modules/schedulers/scheduler.component').then(
            (m) => m.SchedulerComponent
          ),
  },

  {
    path: 'trellos',
    loadComponent: () =>
          import('./modules/trellos/trello.component').then(
            (m) => m.TrelloComponent
          ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
