import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeService } from '@shared/services/poke.service';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [ PokeService ],
})

export class BlogComponent {
  constructor(private pokeService: PokeService) {}

  items: any[] = [];

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
