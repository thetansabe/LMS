import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_COURSE_CARDS } from '@shared/model/card.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() cardItems: any[] = MOCK_COURSE_CARDS;
  
}
