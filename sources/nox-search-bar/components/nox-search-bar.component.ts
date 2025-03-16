import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NoxSearchBarFieldsComponent } from './nox-search-bar-fields.component';
import { NoxSearchBarField } from '../data/nox-search-bar-field';
import { NoxSearchBarFieldDropDownStaticItem } from '../data/nox-search-bar-field-drop-down-static-item';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoxSearchBarSearchEvent } from '../events/nox-search-bar-search-event';
import { NoxDateTimeService } from '../../nox-core/services/nox-date-time.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoxTreeDropDownComponent } from '../../nox-controls/components/nox-tree-drop-down/nox-tree-drop-down.component';

@Component({
  selector: 'nox-search-bar',
  templateUrl: './nox-search-bar.component.html',
  styleUrls: ['./nox-search-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NoxTreeDropDownComponent
  ]
})
export class NoxSearchBarComponent implements AfterContentInit {
  @ContentChild(NoxSearchBarFieldsComponent) fieldsComponent!: NoxSearchBarFieldsComponent;

  formGroup: FormGroup = new FormGroup({});

  _fields: NoxSearchBarField[] = [];

  get fields(): NoxSearchBarField[] {
    return this._fields;
  }
  @Input() set fields(value: NoxSearchBarField[]) {
    this._fields = value;

    this.invalidateFields();
  }

  get data(): any {
    return this.getData();
  }
  @Input() set data(value: any) {
    this.setData(value);
  }

  @Input() searchButtonText: string = "Search";

  @Input() searchButtonIcon!: IconProp;

  @Input() mobileCancelButtonText: string = "Cancel";

  @Input() mobileSearchTitle: string = "Filter";

  @Output() onSearch = new EventEmitter<NoxSearchBarSearchEvent>();

  constructor(private readonly dateTimeService: NoxDateTimeService) {

  }

  ngAfterContentInit(): void {

    if (this.fieldsComponent) {
      this.fieldsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.fields = this.fieldsComponent.fields;
      });

      this.fields = this.fieldsComponent.fields;
    }

    this.data = {};
    this.validateFieldsDependencies();
  }

  getData(): any {
    let data: any = {};

    if (this._fields) {
      this._fields.forEach((field: NoxSearchBarField) => {
        data[field.name] = this.formGroup.controls[field.name].value;
      });
    }

    //console.info("data >>>>>>", data);

    return data;
  }

  setData(value: any) {
    if (this._fields) {
      this._fields.forEach((field: NoxSearchBarField) => {
        if (value[field.name]) {
          this.formGroup.controls[field.name].setValue(value[field.name]);
        } else {
          if (field.type == "date") {
            if (field.defaultValue) {
              this.formGroup.controls[field.name].setValue(this.dateTimeService.getISODateFromText(field.defaultValue));
            }
          } else {
            this.formGroup.controls[field.name].setValue(field.defaultValue);
          }
        }
      });

      this.validateFieldsDependencies();
    }
  }

  invalidateFields() {
    if (this._fields) {
      this._fields.forEach((field: NoxSearchBarField) => {
        let control = new FormControl();

        control.valueChanges.subscribe((value: any) => {
          this.onFieldControlValueChanged(field, control, value);
        });

        this.formGroup.addControl(field.name, control);
      });
    }
  }

  onSearchButtonClicked() {
    this.doSearch();
  }

  onTextFieldInput(event: any, field: NoxSearchBarField) {
    this.data[field.name] = event.target.value;
  }

  onDropDownFieldInput(event: any, field: NoxSearchBarField) {
    this.data[field.name] = event.target.value;
  }

  getValueForField(fieldName: string): any {
    if (this.data[fieldName])
      return this.data[fieldName];
    else
      return null;
  }

  getField(name: string): NoxSearchBarField | undefined {
    let result: NoxSearchBarField | undefined;

    this.fields.forEach((field: NoxSearchBarField) => {
      if (field.name == name)
        result = field;
    });

    return result;
  }

  getFieldDropDownItems(field: NoxSearchBarField): Array<any> {
    const result: any[] = [];

    field.dropDownStaticItems?.forEach((item: NoxSearchBarFieldDropDownStaticItem) => {
      if (item.mergeSide == "top") {
        const newItem: any = {};

        if (field.dropDownItemValueFieldName)
          newItem[field.dropDownItemValueFieldName] = item.value;
        if (field.dropDownItemDisplayFieldName)
          newItem[field.dropDownItemDisplayFieldName] = item.text;

        result.push(newItem);
      }
    });

    field.dropDownItems?.forEach((dropDownItem: any) => {
      if (field.parentFieldName) {
        var parentField = this.getField(field.parentFieldName);
        if (parentField) {
          var parentFieldControl = this.formGroup.controls[parentField.name];
          if (parentFieldControl && field.dropDownItemForeignKeyFieldName) {
            if (dropDownItem[field.dropDownItemForeignKeyFieldName]) {
              if (dropDownItem[field.dropDownItemForeignKeyFieldName] == parentFieldControl.value)
                result.push(dropDownItem);
            } else {
              result.push(dropDownItem);
            }
          } else {
            result.push(dropDownItem);
          }
        } else {
          result.push(dropDownItem);
        }
      } else {
        result.push(dropDownItem);
      }
    });

    field.dropDownStaticItems?.forEach((item: NoxSearchBarFieldDropDownStaticItem) => {
      if (item.mergeSide == "bottom") {
        const newItem: any = {};

        if (field.dropDownItemValueFieldName)
          newItem[field.dropDownItemValueFieldName] = item.value;
        if (field.dropDownItemDisplayFieldName)
          newItem[field.dropDownItemDisplayFieldName] = item.text;

        result.push(newItem);
      }
    });

    return result;
  }


  getFieldDropDownItemText(dropDownItem: any, field: NoxSearchBarField): string {
    if (field.dropDownItemDisplayFieldName) {
      if (dropDownItem[field.dropDownItemDisplayFieldName])
        return dropDownItem[field.dropDownItemDisplayFieldName];
      else
        return "";
    } else {
      return "";
    }
  }

  getFieldDropDownItemValue(dropDownItem: any, field: NoxSearchBarField): any {
    if (field.dropDownItemValueFieldName) {
      if (dropDownItem[field.dropDownItemValueFieldName])
        return dropDownItem[field.dropDownItemValueFieldName];
      else
        return "";
    } else {
      return "";
    }
  }

  validateFieldsDependencies() {
    if (this._fields) {
      this._fields.forEach((field: NoxSearchBarField) => {
        this._fields.forEach((subField: NoxSearchBarField) => {
          if (subField.parentFieldName && subField.parentFieldName == field.name) {
            var fieldControl = this.formGroup.controls[field.name];
            var subFieldControl = this.formGroup.controls[subField.name];

            if (fieldControl.value) {
              subFieldControl.enable({
                onlySelf: true,
                emitEvent: false
              });
            } else {
              subFieldControl.disable({
                onlySelf: true,
                emitEvent: false
              });
            }
          }
        });
      });
    }
  }

  clearChildDropDowns(parentField: NoxSearchBarField) {
    if (this._fields) {
      this._fields.forEach((field: NoxSearchBarField) => {
        if (field.type == "dropDown" && field.parentFieldName && field.parentFieldName == parentField.name) {
          const fieldControl = this.formGroup.controls[field.name];
          if (fieldControl) {
            fieldControl.setValue(undefined, {
              emitEvent: false
            });
          }
        }
      });
    }

    return undefined;
  }

  onFieldControlValueChanged(field: NoxSearchBarField, control: AbstractControl, value: any) {
    if (field.type == "dropDown") {
      this.clearChildDropDowns(field);
      this.validateFieldsDependencies();
    }

    // console.info("field", field);
    // console.info("control", control);
    // console.info("value", value);
  }

  onInputEnter() {
    this.doSearch();
  }

  doSearch() {
    this.onSearch.emit({
      data: this.data
    });
  }

}
