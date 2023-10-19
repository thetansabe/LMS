import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidemenuComponent } from '@shared/components/sidemenu/sidemenu.component';

@Component({
  selector: 'app-course-main-view',
  standalone: true,
  imports: [CommonModule, RouterModule, SidemenuComponent],
  templateUrl: './course-main-view.component.html',
  styleUrls: ['./course-main-view.component.scss']
})
export class CourseMainViewComponent {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log("Course ID ~ 18: ", params['id']);
    });
  }
}
