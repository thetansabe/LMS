import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMainViewComponent } from './course-main-view.component';

describe('CourseMainViewComponent', () => {
  let component: CourseMainViewComponent;
  let fixture: ComponentFixture<CourseMainViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseMainViewComponent]
    });
    fixture = TestBed.createComponent(CourseMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
