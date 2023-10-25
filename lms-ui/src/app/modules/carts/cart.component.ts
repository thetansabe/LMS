import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CourseCard, MOCK_COURSE_CARDS } from '@shared/model/card.model';
import {
  Observable,
  Subject,
  filter,
  from,
  map,
  of,
  scan,
  share,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { FormsModule } from '@angular/forms';

const registeredCourses = (
  selected: Set<string>,
  courseId: string,
  isSelectAll: boolean
) => {
  //use Set to make sure no duplicated courseId
  //if in selectAll mode, do not remove any courseId, else remove existed courseId
  if (selected.has(courseId) && !isSelectAll) {
    selected.delete(courseId);
  } else {
    selected.add(courseId);
  }

  return selected;
};

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItems$: Observable<CourseCard[]> = null!;
  selectItem$ = new Subject<string>();

  selectedItems$ = this.selectItem$.pipe(
    scan(
      (acc: Set<string>, currVal: string) =>
        registeredCourses(acc, currVal, this.isSelectAll),
      new Set<string>()
    ), //each time selectItem$ emits, perform reduce() on the value emitted
    startWith(new Set<string>()), //avoid empty data stream
    map((selected) => Array.from(selected)), //convert Set to Array,
    share()
  );

  ngOnInit() {
    this.cartItems$ = of(MOCK_COURSE_CARDS);
  }

  trackById(index: string, item: CourseCard) {
    return item.id;
  }

  deleteItem(id: string) {
    //UI deletion
    this.cartItems$ = this.cartItems$.pipe(
      map((items) => items.filter((item) => item.id !== id))
      // another way:
      // switchMap((items) => from(items)),
      // filter((item) => item.id !== id),
      // reduce((acc, item) => [...acc, item], [] as CourseCard[])
    );

    //selected items deletion
    this.selectedItems$
      .pipe(
        switchMap((ids) => from(ids)),
        filter((_id) => _id === id)
      )
      .subscribe((id) => {
        this.isSelectAll = false;
        this.selectItem$.next(id);
      });

    this.selectItem$.next(id);
  }

  addItem(id: string) {
    if (this.isSelectAll) {
      this.isSelectAll = false;
      this.cartItems$
        .pipe(
          switchMap((items) => from(items)),
          filter((item) => item.id !== id),
          map((item) => item.id)
        )
        .subscribe((id) => {
          this.selectItem$.next(id);
        });
    }

    this.selectItem$.next(id);
  }

  isSelectAll: boolean = false;

  selectAll() {
    this.isSelectAll = !this.isSelectAll;

    this.cartItems$
      .pipe(
        switchMap((items) => from(items)),
        map((item) => item.id)
      )
      .subscribe((id) => this.selectItem$.next(id));
  }
}
