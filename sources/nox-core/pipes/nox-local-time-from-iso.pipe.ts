import { Pipe, PipeTransform } from '@angular/core';
import { NoxDateTimeService } from '../services/nox-date-time.service';
import { NoxConfigurationService } from '../services/nox-configuration.service';

@Pipe({ name: 'NoxLocalTimeFromISO' })
export class NoxLocalTimeFromISOPipe implements PipeTransform {
  constructor(private readonly dateTimeService: NoxDateTimeService,
              private readonly configurationService: NoxConfigurationService) {

  }

  transform(value: any): any {
    const dateTime = this.dateTimeService.toLocalFromISO(value);
    if (dateTime)
      return dateTime.toFormat(this.configurationService.timeDisplayFormat);
    else
      return "error";
  }
}
