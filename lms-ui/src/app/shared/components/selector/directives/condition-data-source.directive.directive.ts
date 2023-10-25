import { Directive } from '@angular/core';
import { SELECT_DIRECTIVE } from './constrants';
import { Option, SelectDirective } from './types';
import { Observable } from 'rxjs';

@Directive({
  selector: 'app-select-control[appConditionDataSource]',
  providers: [
    {
      provide: SELECT_DIRECTIVE,
      useExisting: ConditionDataSourceDirective,
    },
  ],
})
export class ConditionDataSourceDirective implements SelectDirective {
  options$!: Observable<Option[]>;
  // constructor(private ref: RefService) {}

  // options$: Observable<Option[]> = this.ref.getConditions();
}
