import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { NoxFormFieldStaticDropDownItem } from '../data/nox-form-field-drop-static-down-item';
import { NoxFormFieldStaticDropDownItemComponent } from './nox-form-field-drop-static-down-item.component';

@Component({
  selector: 'nox-form-field-static-drop-down-items',
  template: ""
})
export class NoxFormFieldStaticDropDownItemsComponent implements AfterContentInit {
  @ContentChildren(NoxFormFieldStaticDropDownItemComponent) itemComponents!: QueryList<NoxFormFieldStaticDropDownItemComponent>;

  staticItems: NoxFormFieldStaticDropDownItem[] = [];

  ngAfterContentInit(): void {
    if (this.itemComponents != null) {
      this.itemComponents.forEach((itemComponent: NoxFormFieldStaticDropDownItemComponent) => {
        this.staticItems.push({
          text: itemComponent.text,
          value: itemComponent.value,
          hasNullValue: itemComponent.hasNullValue,
          mergeSide: itemComponent.mergeSide
        });
      });
    }
  }
}
