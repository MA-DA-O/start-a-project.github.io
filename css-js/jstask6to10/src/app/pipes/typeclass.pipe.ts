import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeclass',
})
export class TypeclassPipe implements PipeTransform {
  type: any = {
    0: '首页banner',
    1: '找职位banner',
    2: '找精英banner',
    3: '行业大图',
  };

  transform(value: any, args?: any[]): any {
    return this.type[value];
  }
}
