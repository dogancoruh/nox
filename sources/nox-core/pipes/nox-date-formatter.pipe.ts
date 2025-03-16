import { Pipe, PipeTransform } from '@angular/core';
import { NoxConfigurationService } from '../services/nox-configuration.service';

@Pipe({ name: 'NoxDateFormatter' })
export class NoxDateFormatter implements PipeTransform {
  constructor(private configurationService: NoxConfigurationService) {

  }

  transform(value: any): any {
    // let date = moment(value, "YYYY-MM-DDTHH:mm:ss.000");

    // return (moment(date).format(this.configurationService.dateFormat));
    return value;
  }
}
