import { AfterViewInit, Component, EventEmitter, HostBinding, Input, Output, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { ObjectIterator } from '../../../nox-core/classes/object-iterator';
import { NoxTreeNodeSelectionChangedEvent } from '../../../nox-tree/events/nox-tree-node-selection-changed-event';
import { ObjectIterationArgs } from '../../../nox-core/classes/object-iteration-args';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoxFormFieldValidator } from '../../../nox-form/data/nox-form-field-validator';
import { NoxTreeDropDownValueChangedEvent } from './events/nox-tree-drop-down-value-changed-event';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { NoxTreeDropDownEmptySelectionType } from './enums/nox-tree-drop-down-empty-selection-type';
import { StringHelper } from '../../../nox-core/classes/string-helper';
import { NoxTreeComponent } from '../../../nox-tree/components/nox-tree.component';

@Component({
  selector: 'nox-tree-drop-down',
  templateUrl: './nox-tree-drop-down.component.html',
  styleUrls: ['./nox-tree-drop-down.component.scss'],
  imports: [
    NoxTreeComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoxTreeDropDownComponent),
      multi: true
    }
  ],
  standalone: true
})
export class NoxTreeDropDownComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild(NgbDropdown) dropDown!: NgbDropdown;

  onChange: any;
  onTouched: any;
  disabled: boolean = false;

  @Input() textFieldName: string = "text";
  @Input() valueFieldName: string = "value";
  @Input() childrenFieldName: string = "items";
  @Input() selectableFieldName: string = "selectable";
  @Input() selectedFieldName: string = "selected";
  @Input() validators?: NoxFormFieldValidator[];
  @Input() multiSelect: boolean = false;
  @Input() emptySelectionText?: string = "";
  @Input() emptySelectionType?: NoxTreeDropDownEmptySelectionType = "none";
  @Input() dropDownWidth: any = "300px";
  @Input() autoExpand: any = true;
  @Input() autoExpandDepth: number = 0;
  
  private _items: any[] | undefined = [];

  get items(): any[] | undefined {
    return this._items;
  }
  @Input()
  set items(value: any[] | undefined) {
    this._items = value;
    this.refreshItemSelection();
  }

  private _value: any = undefined;

  get value(): any {
    return this._value;
  }
  @Input()
  set value(val: any) {
    this._value = val;
    this.refreshItemSelection();
  }

  valueSelected: boolean = false;

  @Output() onValueChanged = new EventEmitter<NoxTreeDropDownValueChangedEvent>();

  constructor(protected readonly configurationService: NoxConfigurationService) {
  }

  ngAfterViewInit(): void {
    this.dropDown.openChange.subscribe((value: boolean) => {
      if (!this.valueSelected && !value) {
        if (this.onTouched) {
          this.onTouched();
        }
      }
    });
  }

  getValueOfItem(item: any): any {
    if (item[this.valueFieldName!] != undefined)
      return item[this.valueFieldName!];
    else
      return undefined;
  }

  getTextOfItem(item: any): any {
    if (item[this.textFieldName!] != undefined)
      return item[this.textFieldName!];
    else
      return undefined;
  }

  getSelectedText(): string {
    let text: string = "";

    ObjectIterator.iterate(this._items, (obj: any, iterationArgs: ObjectIterationArgs) => {
      if (obj[this.valueFieldName!] != undefined) {
        if (!this.multiSelect) {
          if (obj[this.valueFieldName!] == this._value) {
            if (obj[this.textFieldName!] != undefined) {
              if (text)
                text += ",";

              text += obj[this.textFieldName!];
            }
          }
        } else {
          const valueStr = this._value != null ? this._value.toString() : "";
          const values = valueStr.split(",");
          if (values.indexOf(obj[this.valueFieldName!].toString()) != -1) {
            if (obj[this.textFieldName!] != undefined) {
              if (text)
                text += ",";

              text += obj[this.textFieldName!];
            }
          }
        }
      }
    }, this.childrenFieldName);

    if (text == "")
      text = this.getEmptySelectionText();

    text = StringHelper.ellipses(text, 50);

    return text;
  }

  // ControlValueAccessor functions

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTreeSelectionChanged(event: NoxTreeNodeSelectionChangedEvent) {
    if (!this.multiSelect) {
      if (event.node[this.valueFieldName!] != undefined)
        this._value = event.node[this.valueFieldName!];
      else
        this._value = undefined;
    } else {
      let val = "";

      ObjectIterator.iterate(this._items, (obj: any, iterationArgs: ObjectIterationArgs) => {
        if (this.valueFieldName != undefined && this.selectedFieldName != undefined) {
          if (obj[this.selectedFieldName] == true) {
            if (obj[this.valueFieldName!] != undefined) {
              if (val)
                val += ",";

              if (obj[this.valueFieldName!] != null)
                val += obj[this.valueFieldName!].toString();
            }
          }
        }
      }, this.childrenFieldName);

      this._value = val;
    }

    if (!this.multiSelect)
      this.dropDown.close();

    this.valueSelected = true;

    if (this.onChange)
      this.onChange(this._value);

    this.onValueChanged.emit({
      value: this._value
    })
  }

  refreshItemSelection() {
    ObjectIterator.iterate(this._items, (obj: any, iterationArgs: ObjectIterationArgs) => {

      if (obj[this.valueFieldName!] != undefined) {
        if (this.multiSelect) {
          const valueStr = this._value != null ? this._value.toString() : "";
          const values = valueStr.split(",");
          obj[this.selectedFieldName] = values.indexOf(obj[this.valueFieldName!].toString()) != -1;
        }
      }
    }, this.childrenFieldName);
  }

  getEmptySelectionText(): string {
    if (!this.emptySelectionText) {
      if (this.emptySelectionType == "none")
        return this.configurationService.noneText;
      else /*if (this.emptySelectionType == "all")*/
        return this.configurationService.allText;
    } else {
      return this.emptySelectionText;
    }
  }
}
