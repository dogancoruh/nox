import { Component, Input } from '@angular/core';

@Component({
  selector: 'nox-table-dropdown-column-item',
  template: ""
})
export class NoxTableDropDownColumnItemComponent {
  @Input() text: string = "";
  @Input() value: any;
}
