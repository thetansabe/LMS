import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent {
  courseId : any = null!;

  constructor(private route: Router, private activatedRoute : ActivatedRoute) {}
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params;
    });
  }

}
