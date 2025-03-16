import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { NoxTableActionDisplayType } from '../enums/nox-table-action-display-type';
import { NoxTableActionButtonType } from '../enums/nox-table-action-button-type';

@Component({
  selector: 'nox-table-action',
  template: ""
})
export class NoxTableActionComponent {
  @ContentChild(TemplateRef<any>) _template!: TemplateRef<any>;

  @Input() name: string = "";
  @Input() title: string = "";
  @Input() link: string = "";
  @Input() isContext: boolean = true;
  @Input() buttonType: NoxTableActionButtonType = "button";
  @Input() isBatch: boolean = false;
  @Input() hasDivider: boolean = false;

  @Input() get template(): TemplateRef<any> {
    return this._template;
  }

  @Input() enabled?: boolean = true;
}
