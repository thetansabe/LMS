import { Directive } from '@angular/core';
import { SELECT_DIRECTIVE } from './constrants';
import { SelectDirective, Option } from './types';
import { Observable, of } from 'rxjs';

@Directive({
  selector: 'app-select-control[appModeDataSource]',
  standalone: true,
  providers: [
    {
      provide: SELECT_DIRECTIVE,
      useExisting: ModeDataSourceDirective,
    },
  ],
})
export class ModeDataSourceDirective implements SelectDirective {
  options$: Observable<Option[]> = of([
    { label: 'Auto', value: 'auto' },
    { label: 'Manual', value: 'manual' },
  ]);
}
