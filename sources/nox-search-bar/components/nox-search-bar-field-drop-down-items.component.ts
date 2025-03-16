import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NoxSearchBarFieldDropDownItemComponent } from './nox-search-bar-field-drop-down-item.component';
import { NoxSearchBarFieldDropDownItem } from '../data/nox-search-bar-field-drop-down-item';

@Component({
  selector: 'nox-search-bar-field-drop-down-items',
  template: ''
})
export class NoxSearchBarFieldDropDownItemsComponent implements AfterContentInit {
  @ContentChildren(NoxSearchBarFieldDropDownItemComponent) dropDownItemComponents!: QueryList<NoxSearchBarFieldDropDownItemComponent>;

  dropDownItems: NoxSearchBarFieldDropDownItem[] = [];

  ngAfterContentInit(): void {
    if (this.dropDownItemComponents) {
      this.dropDownItemComponents.forEach((itemComponent: NoxSearchBarFieldDropDownItemComponent) => {
        this.dropDownItems.push({
          text: itemComponent.text,
          value: itemComponent.value
        });
      });
    }
  }
}
