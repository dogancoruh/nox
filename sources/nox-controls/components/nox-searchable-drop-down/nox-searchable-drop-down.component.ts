import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { NoxDropDownItem } from '../../classes/nox-drop-down-item';

@Component({
  selector: 'nox-searchable-drop-down',
  templateUrl: './nox-searchable-drop-down.component.html',
  styleUrls: ['./nox-searchable-drop-down.component.scss']
})
export class NoxSearchableDropDownComponent implements AfterViewInit {
  private _value: any;
  @Input() get value(): any {
    return this._value;
  }
  set value(val: any) {
    this._value = val;

    if (this.defaultItemValue == this._value)
      this.selectedItem = this.defaultItem;

    if (this.items) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value == this._value) {
          this.selectedItem = this.items[i];
        }
      }
    }
  }

  @Input() itemTextProperty: string = "text";
  @Input() itemValueProperty: string = "value";

  @Input() items: any[] = [];
  selectedItem: any;

  @Input() searchable: boolean = false;
  @Input() searchKeyword: string = "";
  @Input() searchPlaceholder: string = "Search...";

  @Input() defaultItemVisible: boolean = false;
  @Input() defaultItemText: string = "All";
  @Input() defaultItemValue: any;

  @Output() onValueChanged = new EventEmitter();
  @Output() input = new EventEmitter();

  ngAfterViewInit(): void {
    if (this.defaultItemValue == this._value)
      this.selectedItem = this.defaultItem;
  }

  get defaultItem(): any {
    let result: any = {};
    result[this.itemTextProperty] = this.defaultItemText;
    result[this.itemValueProperty] = this.defaultItemValue;
    return result;
  }

  onItemSelected(event: any, item: NoxDropDownItem) {
    this.selectedItem = item;
    this._value = item.value;

    this.searchKeyword = "";

    this.onValueChanged.emit({
      value: this._value
    });

    this.input.emit({
      value: this._value
    });
  }

  getItemText(item: any): string {
    if (item) {
      if (item[this.itemTextProperty]) {
        return item[this.itemTextProperty];
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  getItemValue(item: any): any {
    if (item) {
      if (item[this.itemValueProperty]) {
        return item[this.itemValueProperty];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getSelectedItemText(): string {
    if (this.selectedItem) {
      if (this.selectedItem[this.itemTextProperty]) {
        return this.selectedItem[this.itemTextProperty];
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  isItemContain(item: any, searchKeyword: string): boolean {
    if (item) {
      if (item[this.itemTextProperty]) {
        return item[this.itemTextProperty].toLowerCase().includes(searchKeyword.toLowerCase());
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
