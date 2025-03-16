import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { NoxFormFieldDropDownItemComponent } from './nox-form-field-drop-down-item.component';
import { NoxFormFieldDropDownItem } from '../data/nox-form-field-drop-down-item';

@Component({
  selector: 'nox-form-field-drop-down-items',
  template: ""
})
export class NoxFormFieldDropDownItemsComponent implements AfterContentInit {
  @ContentChildren(NoxFormFieldDropDownItemComponent) itemComponents!: QueryList<NoxFormFieldDropDownItemComponent>;

  items: NoxFormFieldDropDownItem[] = [];

  ngAfterContentInit(): void {
    if (this.itemComponents != null) {
      this.itemComponents.forEach((itemComponent: NoxFormFieldDropDownItemComponent) => {
        this.items.push({
          text: itemComponent.text,
          value: itemComponent.value,
        });
      });
    }
  }
}
