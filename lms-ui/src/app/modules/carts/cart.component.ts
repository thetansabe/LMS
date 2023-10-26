import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CourseCard, MOCK_COURSE_CARDS } from '@shared/model/card.model';
import {
  Observable,
  of,
} from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems$: Observable<CourseCard[]> = null!;
  cartItems: CourseCard[] = [];
  
  selectedItems: Set<string> = new Set<string>();

  isSelected(item: string): boolean {
    return this.selectedItems.has(item);
  }

  ngOnInit() {
    //in real world, this is a http request
    //return observable, so we have to work with it
    this.cartItems$ = of(MOCK_COURSE_CARDS);
    this.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  get isIndet() {
    return (
      this.selectedItems.size > 0 &&
      this.selectedItems.size !== this.cartItems.length
    );
  }

  addItem(id: string) {
    // handle selectedItems logic
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    } else {
      this.selectedItems.add(id);
    }

    // handle UI isSelectAll logic
    if(this.selectedItems.size === 0 && this.isSelectAll)
      this.isSelectAll = false;

    if(this.selectedItems.size === this.cartItems.length)
      this.isSelectAll = true;
  }

  isSelectAll: boolean = false;

  selectAll() {
    this.isSelectAll = !this.isSelectAll;
    
    if (!this.isSelectAll) {
      this.selectedItems.clear();
      return;
    }

    this.cartItems.forEach((item) => {
      this.selectedItems.add(item.id);
    });
  }

  deleteItem(id: string) {
    // handle selectedItems logic
    if (this.selectedItems.has(id)) {
      this.selectedItems.delete(id);
    }

    // handle UI cart display logic
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  }

  checkOut() {
    console.log('checkOut: ', this.selectedItems);
    //use selectedItems to do further tasks
  }
}
