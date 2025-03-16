import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NoxFormFieldType } from '../enums/nox-form-field-type';
import { NoxFormFieldDropDownItemsComponent } from './nox-form-field-drop-down-items.component';
import { NoxFormFieldValueBehavior } from '../enums/nox-form-field-value-behavior';
import { NoxFormFieldValidator } from '../data/nox-form-field-validator';
import { NoxFormFieldStaticDropDownItemsComponent } from './nox-form-field-drop-static-down-items.component';
import { NoxFormFieldStaticDropDownItem } from '../data/nox-form-field-drop-static-down-item';
import { NoxFormItemComponent } from './nox-form-item.component';
import { NoxFormFieldValidatorsComponent } from './nox-form-field-validators.component';
import { NoxFormFieldActionsComponent } from './nox-form-field-actions.component';
import { NoxFormFieldAction } from '../data/nox-form-field-action';

@Component({
  selector: 'nox-form-field',
  template: "",
  providers: [{ provide: NoxFormItemComponent, useExisting: NoxFormFieldComponent }]
})
export class NoxFormFieldComponent extends NoxFormItemComponent implements AfterContentInit, OnChanges {
  @ContentChild(NoxFormFieldDropDownItemsComponent) dropDownItemsComponent!: NoxFormFieldDropDownItemsComponent;
  @ContentChild(NoxFormFieldStaticDropDownItemsComponent) staticDropDownItemsComponent!: NoxFormFieldStaticDropDownItemsComponent;
  @ContentChild(NoxFormFieldValidatorsComponent) validatorsComponent!: NoxFormFieldValidatorsComponent;
  @ContentChild(NoxFormFieldActionsComponent) actionsComponent!: NoxFormFieldActionsComponent;

  @Input() type: NoxFormFieldType = "none";
  @Input() dropDownItems?: any[];
  @Input() staticDropDownItems?: NoxFormFieldStaticDropDownItem[];
  @Input() dropDownItemDisplayFieldName?: string = "text";
  @Input() dropDownItemValueFieldName?: string = "value";
  @Input() dropDownItemForeignKeyFieldName?: string = "parentId";
  @Input() dropDownEmptySelectionText?: string = "";
  @Input() dropDownWidth: any = "300px";
  @Input() validators?: NoxFormFieldValidator[];
  @Input() readonly?: boolean = false;
  @Input() dateFormat?: string = "";
  @Input() autofocus?: boolean = false;
  @Input() baseUrl: string | undefined = undefined;
  @Input() urlPrefix?: string = "";
  @Input() valueBehavior?: NoxFormFieldValueBehavior = "text";
  @Input() maxLength?: number = 255;
  @Input() stClass: string | string[] | undefined = undefined;
  @Input() filePropertyName: string | undefined;
  @Input() parentFieldName: string | undefined;
  @Input() userCanTogglePasswordVisibility: boolean = false;
  @Input() textFieldName?: string = "text";
  @Input() valueFieldName?: string = "123";
  @Input() childrenFieldName?: string = "children";
  @Input() foreignKeyFieldName?: string = "parentId";
  @Input() acceptedFileExtensions?: string = "";
  @Input() disabled?: boolean = false;
  @Input() actions?: NoxFormFieldAction[];

  @Output() onChange = new EventEmitter();

  ngAfterContentInit(): void {
    if (this.dropDownItemsComponent)
      this.dropDownItems = this.dropDownItemsComponent.items;
    if (this.staticDropDownItemsComponent)
      this.staticDropDownItems = this.staticDropDownItemsComponent.staticItems;
    if (this.validatorsComponent)
      this.validators = this.validatorsComponent.validators;
    if (this.actionsComponent)
      this.actions = this.actionsComponent.actions;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
