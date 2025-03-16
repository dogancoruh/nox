import { AfterContentInit, Component, ContentChildren } from '@angular/core';
import { NoxTableDropDownColumnItemComponent } from './nox-table-dropdown-column-item.component';
import { NoxTableDropDownColumnItem } from '../data/nox-table-dropdown-column-item';

@Component({
  selector: 'nox-table-dropdown-column-items',
  template: ""
})
export class NoxTableDropDownColumnItemsComponent implements AfterContentInit {
  @ContentChildren(NoxTableDropDownColumnItemComponent) itemComponents!: NoxTableDropDownColumnItemComponent[];

  items: NoxTableDropDownColumnItem[] = [];

  ngAfterContentInit(): void {
    if (this.itemComponents != null) {
      this.itemComponents.forEach((itemComponent: NoxTableDropDownColumnItemComponent) => {
        this.items.push({
          text: itemComponent.text,
          value: itemComponent.value
        });
      });
    }
  }
}
