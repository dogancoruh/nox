import { AfterViewInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { NoxRepeaterContext } from './nox-repeater-context';

@Component({
  selector: 'nox-repeater',
  templateUrl: './nox-repeater.component.html',
  styleUrl: './nox-repeater.component.scss'
})
export class NoxRepeaterComponent implements AfterViewInit {
  @ContentChild("headerTemplate") headerTemplate!: TemplateRef<any>;
  @ContentChild("itemTemplate") itemTemplate!: TemplateRef<any>;
  @ContentChild("footerTemplate") footerTemplate!: TemplateRef<any>;

  @Input() columns!: any[];
  @Input() items!: any[];

  constructor(private configurationService: NoxConfigurationService) {

  }

  ngAfterViewInit(): void {
    if (!this.itemTemplate)
      throw new Error("Item template is not defined");
  }

  getContext(): NoxRepeaterContext {
    return {
      columns: this.columns,
      items: this.items
    };
  }
}
