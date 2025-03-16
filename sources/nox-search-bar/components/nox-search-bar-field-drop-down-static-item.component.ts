import { Component, Input } from '@angular/core';
import { NoxSearchBarDropDownStaticItemMergeSide } from '../enums/nox-search-bar-field-drop-down-item-merge-side';

@Component({
  selector: 'nox-search-bar-field-drop-down-static-item',
  template: ''
})
export class NoxSearchBarFieldDropDownStaticItemComponent {
  @Input() text: string = "";
  @Input() value?: any | null = null;
  @Input() mergeSide: NoxSearchBarDropDownStaticItemMergeSide = "top";
}
