import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedDigit',
  standalone: true
})
export class NoxFixedDigitPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    let valueStr = value.toString();

    if (args.length == 1) {
      const digitCount = args[0];

      const valueStrLength = valueStr.length;
      for (let i = 0; i < digitCount - valueStrLength; i++) {
        valueStr = "0" + valueStr;
      }
    }

    return valueStr;
  }

}
