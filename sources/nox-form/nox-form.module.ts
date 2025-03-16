import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoxFormComponent } from './components/nox-form.component';
import { NoxFormItemsComponent } from './components/nox-form-items.component';
import { NoxFormFieldComponent } from './components/nox-form-field.component';
import { NoxFormButtonsComponent } from './components/nox-form-buttons.component';
import { NoxFormButtonComponent } from './components/nox-form-button.component';
import { NoxCoreModule } from '../nox-core/nox-core.module';
import { NoxFormFieldDropDownItemsComponent } from './components/nox-form-field-drop-down-items.component';
import { NoxFormFieldDropDownItemComponent } from './components/nox-form-field-drop-down-item.component';
import { NoxFormFieldValidatorComponent } from './components/nox-form-field-validator.component';
import { NoxFormFieldValidatorsComponent } from './components/nox-form-field-validators.component';
import { NoxFormFieldStaticDropDownItemsComponent } from './components/nox-form-field-drop-static-down-items.component';
import { NoxFormFieldStaticDropDownItemComponent } from './components/nox-form-field-drop-static-down-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoxDataAdapterModule } from '../nox-data-adapter/nox-data-adapter.module';
import { NoxFormDataAdapterComponent } from './components/nox-form-data-adapter.component';
import { NoxFormItemComponent } from './components/nox-form-item.component';
import { NoxFormFieldGroupComponent } from './components/nox-form-field-group.component';
import { NoxFormFieldRepeaterComponent } from './components/nox-form-field-repeater.component';
import { RouterModule } from '@angular/router';
import { NoxFormValidatorsComponent } from './components/nox-form-validators.component';
import { NoxFormValidatorComponent } from './components/nox-form-validator.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoxControlsModule } from '../nox-controls/nox-controls.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NoxEditorModule } from '../nox-editor/nox-editor.module';
import { NoxFormFieldActionComponent } from './components/nox-form-field-action.component';
import { NoxFormFieldActionsComponent } from './components/nox-form-field-actions.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NoxCoreModule,
    NoxEditorModule,
    NoxDataAdapterModule,
    NoxControlsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule    
],
  declarations: [
    NoxFormComponent,
    NoxFormFieldRepeaterComponent,
    NoxFormItemsComponent,
    NoxFormItemComponent,
    NoxFormFieldComponent,
    NoxFormFieldGroupComponent,
    NoxFormButtonsComponent,
    NoxFormButtonComponent,
    NoxFormFieldDropDownItemsComponent,
    NoxFormFieldDropDownItemComponent,
    NoxFormFieldValidatorsComponent,
    NoxFormFieldValidatorComponent,
    NoxFormFieldStaticDropDownItemsComponent,
    NoxFormFieldStaticDropDownItemComponent,
    NoxFormFieldActionComponent,
    NoxFormFieldActionsComponent,
    NoxFormDataAdapterComponent,
    NoxFormValidatorsComponent,
    NoxFormValidatorComponent,
  ],
  exports: [
    NoxFormComponent,
    NoxFormFieldRepeaterComponent,
    NoxFormItemsComponent,
    NoxFormItemComponent,
    NoxFormFieldComponent,
    NoxFormFieldGroupComponent,
    NoxFormButtonsComponent,
    NoxFormButtonComponent,
    NoxFormFieldDropDownItemsComponent,
    NoxFormFieldDropDownItemComponent,
    NoxFormFieldValidatorsComponent,
    NoxFormFieldValidatorComponent,
    NoxFormFieldStaticDropDownItemsComponent,
    NoxFormFieldStaticDropDownItemComponent,
    NoxFormFieldActionComponent,
    NoxFormFieldActionsComponent,
    NoxFormDataAdapterComponent,
    NoxFormValidatorsComponent,
    NoxFormValidatorComponent
  ],
  providers: [

  ]
})
export class NoxFormModule { }
