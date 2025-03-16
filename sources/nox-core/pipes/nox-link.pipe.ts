import { Pipe, PipeTransform } from '@angular/core';
import { NoxConfigurationService } from '../services/nox-configuration.service';
import { ActivatedRoute } from '@angular/router';
import { LinkHelper } from '../classes/link-helper';

@Pipe({ name: 'NoxLink' })
export class NoxLink implements PipeTransform {
  constructor(private activatedRoute: ActivatedRoute) {

  }

  transform(value: any): any {
    return LinkHelper.processUrlQueryParams(value, this.activatedRoute);
  }
}
