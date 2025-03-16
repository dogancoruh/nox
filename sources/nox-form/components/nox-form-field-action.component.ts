import { Component, Input } from '@angular/core';

/**
 * Nox form action for field
 */
@Component({
  selector: 'nox-form-field-action',
  template: ""
})
export class NoxFormFieldActionComponent {
  @Input() name!: string;
  @Input() icon?: string | undefined;
  @Input() text?: string | undefined;
}
