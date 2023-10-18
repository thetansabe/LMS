import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidemenuComponent } from '@shared/components/sidemenu/sidemenu.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, RouterModule, SidemenuComponent],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  courseId: string = null!;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['id'];
      console.log("Course ID ~ 18: ", this.courseId);
    });
  }
}
