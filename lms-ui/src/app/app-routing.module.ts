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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
