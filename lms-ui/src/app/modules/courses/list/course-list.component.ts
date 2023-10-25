import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseCard, MOCK_COURSE_CARDS } from '@shared/model/card.model';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  cardItems: CourseCard[] = null!;

  ngOnInit() {
    this.cardItems = MOCK_COURSE_CARDS;
  }
}
