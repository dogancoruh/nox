import { Component, Input } from '@angular/core';
import { NoxFormFieldStaticDropDownItemMergeSide } from '../enums/nox-form-field-static-drop-down-item-merge-side';

@Component({
  selector: 'nox-form-field-static-drop-down-item',
  template: ""
})
export class NoxFormFieldStaticDropDownItemComponent {
  @Input() text: string = "";
  @Input() value: any = null;
  @Input() hasNullValue: boolean = false;
  @Input() mergeSide: NoxFormFieldStaticDropDownItemMergeSide = "top";
}
