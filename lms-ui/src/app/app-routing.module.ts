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
      import('./modules/course/course.component').then(
        (m) => m.CourseComponent
      ),

    children: [
      {
        path: ':chapterId/:videoId',
        loadComponent: () =>
          import('./modules/course/view/course-view.component').then(
            (m) => m.CourseViewComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
