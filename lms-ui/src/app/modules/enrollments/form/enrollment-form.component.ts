import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.scss'],
})
export class EnrollmentFormComponent {
  enrollmentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  interests: string[] = ['art', 'coding', 'design', 'music'];

  ngOnInit() {
    this.enrollmentForm = this.fb.group({
      name: '',
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        ],
      ],
      gender: '',
      interests: this.fb.array(this.interests),
      course: '',
    });

    this.enrollmentForm.valueChanges.subscribe({
      next: (value) =>
        console.log(
          'converted interests: ',
          this.convertToValue(value.interests, this.interests)
        ),
      error: console.log,
      complete: () => console.log('complete'),
    });
  }

  submitHandler() {
    console.log('submit data: ', this.enrollmentForm.value);
    // remember to convert interests to value before submit
  }

  get email() {
    return this.enrollmentForm.get('email');
  }

  get password() {
    return this.enrollmentForm.get('password');
  }

  convertToValue(booleanList: boolean[], valueList: any[]) {
    return booleanList
      .map((item, index) => (item ? valueList[index] : ''))
      .filter((item) => item);
  }
}
