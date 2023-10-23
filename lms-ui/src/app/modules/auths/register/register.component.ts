import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subject, debounceTime, delay, filter, map, of, startWith, switchMap, take, tap, timer } from 'rxjs';

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;
const USERNAME_PATTERN = /^[a-z]{6,32}$/i;
const EXISTED_USERNAMES = ['admin', 'user', 'test', 'adminabc', 'adminabcd', 'adminabcde'];

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  //BIG ASS CAUTION: Angular doesn't wait for async validators to complete before firing ngSubmit. 
  //So the form may be invalid if the validators have not resolved.
  formSubmit$: Subject<any> = new Subject();

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          // Validators.pattern(USERNAME_PATTERN),
        ],
        //call api to check existed username
        this.validateUsernameDebounce(this) //custom async validator -> return promise or observable
      ],
      password: [
        '',
        //these are sync validators
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(PASSWORD_PATTERN),
          this.validateWhiteSpace(), //custom sync validator -> return value
        ],
      ],
      repassword: [
        '',
        [
          Validators.required, 
          Validators.minLength(6),
          Validators.pattern(PASSWORD_PATTERN)
        ]
      ],
    },

    {
      //we are trying compare two controls' value in one form, 
      //so this is a validation on FORM not on any single control
      validators: this.validateMatchedControlsValue("password", "repassword")
    }
    );

    this.formSubmit$.pipe(
      tap(() => {
        console.log("Submit");
        this.registerForm.markAsDirty() //dirty state: mark the input form has changed
      }),
      //switch from subject's stream to statusChanges stream
      switchMap(() => 
        this.registerForm.statusChanges.pipe(
          tap(status => console.log("registerForm status before startWith ~ 62: ", status)),
          //the observable may empty -> no stream would be started
          //use startWith for no hanging emission
          startWith(this.registerForm.status),
          tap(status => console.log("registerForm status after startWith ~ 66: ", status)),
          filter(status => status !== 'PENDING'), //filter out PENDING status
          take(1) //take only 1 change from the stream: VALID or INVALID
        )
      ),
      filter(status => status === 'VALID'), //if VALID, continue; else filtered out
      tap(() => console.log("Form submit successfully! Handle side effect... ~ 72"))
    ).subscribe();

  }
  
  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repassword() {
    return this.registerForm.get('repassword');
  }

  //custome sync validator
  validateWhiteSpace(): ValidatorFn {
    return (control: AbstractControl) => {
      let controlVal = control.value;
      if (typeof controlVal === 'number') {
        controlVal = `${controlVal}`;
      }
      let isWhitespace = (controlVal || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid ? null : { whitespace: 'value is only whitespace' };
    };
  }

  //should put this function in a service
  validateExistedUsername(username: string): Observable<boolean> {
    console.log("Trigger API call");
    let isValid = EXISTED_USERNAMES.every(x => x !== username);
    return of(isValid).pipe(delay(1000));
    // in the real world, we gonna fetch data from server, so there is a delay
  }

  //shouldn't be type any, should be type service: UserService, AuthService, etc.
  //Problems in this approach:
  //Not debounced at all, you can see "Trigger API call" is logged many times
  //DONOT USE this approach
  validateUsername(service: any){
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.validateExistedUsername(control.value).pipe(
        debounceTime(300), //debounce typing
        map((isValid: boolean) => {
          console.log("isValid: ", isValid);
          return isValid ? null : { existedUsername: true };
        })
      );
    };
  }

  //Use this successfully debounced
  validateUsernameDebounce(service: any){
    return (control: AbstractControl): Observable<ValidationErrors | null | unknown> => {
      return timer(300).pipe(
        switchMap(() =>
          service.validateExistedUsername(control.value).pipe(
            map((isValid) => {
              console.log("isValid ~ 119: ", isValid);
              return isValid ? null : { existedUsername: true };
            })
          )
        )
      );
    };
  };

  //this method will failed
  //because registerForm is not ready yet, you cannot call get() on it
  //DONT USE this approach
  validateMatchedControlsValueFailed(firstControlName: string, secondControlName: string){
    const firstControlValue = this.registerForm.get(firstControlName)?.value;
    const secondControlValue = this.registerForm.get(secondControlName)?.value;

    return (control: AbstractControl): ValidationErrors | null => {
      if(firstControlValue !== secondControlValue){
        return { 
          valueNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
      }
      return null;
    }
  }

  //Use this:
  validateMatchedControlsValue = (
    firstControlName: string,
    secondControlName: string
  ) => {
    //not AbstractControl anymore, but FormGroup
    return (formGroup: FormGroup): ValidationErrors | null => {
      const { value: firstControlValue } = formGroup.get(
        firstControlName
      ) as AbstractControl;
      const { value: secondControlValue } = formGroup.get(
        secondControlName
      ) as AbstractControl;
      return firstControlValue === secondControlValue
        ? null
        : {
            valueNotMatch: {
              firstControlValue,
              secondControlValue,
            },
          };
    };
  };

}
