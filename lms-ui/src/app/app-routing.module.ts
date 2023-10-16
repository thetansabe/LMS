import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadComponent: () => import('./modules/home/homepage.component').then(m => m.HomepageComponent)},
  {path: 'course', loadComponent: () => import('./modules/course/course.component').then(m => m.CourseComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
