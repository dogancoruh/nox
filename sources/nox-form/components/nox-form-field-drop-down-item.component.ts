import { Component, Input } from '@angular/core';

/**
 * Nox form Drop down item for field.
 */
@Component({
  selector: 'nox-form-field-drop-down-item',
  template: ""
})
export class NoxFormFieldDropDownItemComponent {
  @Input() text: string = "";
  @Input() value: any;
}
