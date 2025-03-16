import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';

@Component({
  selector: 'nox-progress',
  templateUrl: './nox-progress.component.html',
  styleUrl: './nox-progress.component.scss'
})
export class NoxProgressComponent implements AfterViewInit {
  @Input() value: number = 0;
  @Input() maximum: number = 100;

  constructor(private configurationService: NoxConfigurationService) {

  }

  ngAfterViewInit(): void {

  }

  getPercentage(): number {
    return (this.value * 100) / this.maximum;
  }

  getPercentageText() {
    return `%${this.getPercentage()}`;
  }
}
