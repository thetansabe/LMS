import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedVideoIcon'
})
export class CompletedVideoIconPipe implements PipeTransform {

  transform(value: boolean): unknown {
    return value;
  }

}
