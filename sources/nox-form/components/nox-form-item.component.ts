import { Component, Input } from '@angular/core';
import { IdHelper } from '../../nox-core/classes/id-helper';

@Component({
  selector: 'nox-form-item',
  template: ""
})
export class NoxFormItemComponent {
  id: string = IdHelper.createId();

  @Input() name: string = "";
  @Input() title: string = "";
  @Input() visible?: boolean = true;
  @Input() sizeClass: string | string[] | undefined = "col-12";
  @Input() customClass: string | string[] | undefined;
  @Input() informationText?: string = "";
  @Input() placeholder?: string = "";
}
