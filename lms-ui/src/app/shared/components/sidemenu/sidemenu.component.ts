import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LESSON_SIDEMENU_VIEW, MOCK_CHAPTERS } from '@shared/model/lesson-sidemenu-view.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
  chapters: LESSON_SIDEMENU_VIEW[] = null!;

  constructor() {
    this.chapters = MOCK_CHAPTERS;
  }

  toggleChapter(index: number) {
    this.chapters[index].isOpen = !this.chapters[index].isOpen;
  }

}
