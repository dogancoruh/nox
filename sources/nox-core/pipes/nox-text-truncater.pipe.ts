import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'NoxTextTruncater' })
export class NoxTextTruncater implements PipeTransform {
  transform(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}
