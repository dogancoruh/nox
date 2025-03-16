import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NoxSearchBarFieldDropDownStaticItemComponent } from './nox-search-bar-field-drop-down-static-item.component';
import { NoxSearchBarFieldDropDownStaticItem } from '../data/nox-search-bar-field-drop-down-static-item';

@Component({
  selector: 'nox-search-bar-field-drop-down-static-items',
  template: ''
})
export class NoxSearchBarFieldDropDownStaticItemsComponent implements AfterContentInit {
  @ContentChildren(NoxSearchBarFieldDropDownStaticItemComponent) dropDownStaticItemComponents!: QueryList<NoxSearchBarFieldDropDownStaticItemComponent>;

  dropDownStaticItems: NoxSearchBarFieldDropDownStaticItem[] = [];

  ngAfterContentInit(): void {
    if (this.dropDownStaticItemComponents) {
      this.dropDownStaticItemComponents.forEach((itemComponent: NoxSearchBarFieldDropDownStaticItemComponent) => {
        this.dropDownStaticItems.push({
          text: itemComponent.text,
          value: itemComponent.value,
          mergeSide: itemComponent.mergeSide
        });
      });
    }
  }
}
