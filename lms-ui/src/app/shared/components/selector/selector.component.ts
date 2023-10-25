import { Component, Inject, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseControlValueAccessorDirective } from '@shared/directives/base-control-value-accessor.directive';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Option, SelectDirective } from './directives/types';
import { SELECT_DIRECTIVE } from './directives/constrants';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectorComponent,
      multi: true
    }
  ]
})
export class SelectorComponent extends BaseControlValueAccessorDirective{
  @Input() placeholder: string = '';

  options$: Observable<Option[]> = of([]);

  constructor(
    @Optional() controlContainer: ControlContainer,
    @Optional() @Inject(SELECT_DIRECTIVE) private directive: SelectDirective
  ){
    super(controlContainer);
    this.options$ = directive ? directive.options$ : of([]);
  }
}
