import { Component, Input } from '@angular/core';

@Component({
  selector: 'nox-search-bar-field-drop-down-item',
  template: ''
})
export class NoxSearchBarFieldDropDownItemComponent {
  @Input() text: string = "";
  @Input() value?: any;
}
