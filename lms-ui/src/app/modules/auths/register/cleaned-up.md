0) custom sync validator

```
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
```

1) handle check existed username with custom async validator

```
//should put this function in a service
validateExistedUsername(username: string): Observable<boolean> {
  console.log("Trigger API call");
  let isValid = EXISTED_USERNAMES.every(x => x !== username);
  return of(isValid).pipe(delay(1000));
  // in the real world, we gonna fetch data from server, so there is a delay
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
```

2) wait for async validator finish only then submit the formSubmit

```
this.formSubmit$.pipe(
      tap(() => this.registerForm.markAsDirty()),
      switchMap(() => 
        this.registerForm.statusChanges.pipe(
          startWith(this.registerForm.status), 
          filter(status => status !== 'PENDING'),
          take(1)
        )
      ),
      filter(status => status === 'VALID'),
      tap(() => submitHandler())
).subscribe();
```

3) handle check repeatpassword

```
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
```


