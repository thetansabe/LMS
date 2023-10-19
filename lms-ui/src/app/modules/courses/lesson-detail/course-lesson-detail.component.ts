import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-lesson-detail.component.html',
  styleUrls: ['./course-lesson-detail.component.scss']
})
export class CourseLessonDetailComponent {
  courseId : any = null!;

  constructor(private route: Router, private activatedRoute : ActivatedRoute) {}
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params;
    });
  }
}
