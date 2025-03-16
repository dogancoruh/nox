import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NoxCoreModule } from '../nox-core/nox-core.module';
import { NoxSearchableDropDownComponent } from './components/nox-searchable-drop-down/nox-searchable-drop-down.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoxTreeDropDownComponent } from './components/nox-tree-drop-down/nox-tree-drop-down.component';
import { RouterModule } from '@angular/router';
import { NoxDatePickerComponent } from './components/nox-date-picker/nox-date-picker.component';
import { NgbAlertModule, NgbDatepickerModule, NgbDropdown, NgbDropdownModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NoxTreeModule } from '../nox-tree/nox-tree.module';
import { NoxTagsInputComponent } from './components/nox-tags-input/nox-tags-input.component';
import { NoxDragAndDropUploaderComponent } from './components/nox-drag-and-drop-uploader/nox-drag-and-drop-uploader.component';
import { NoxRepeaterComponent } from './components/nox-repeater/nox-repeater.component';
import { NoxTagsUploaderComponent } from './components/nox-tags-uploader/nox-tags-uploader.component';
import { NoxTagsObjectListComponent } from './components/nox-tags-object-list/nox-tags-object-list.component';
import { NoxImageComponent } from './components/nox-image/nox-image.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NoxProgressComponent } from './components/nox-progress/nox-progress.component';
import { NoxTimePickerComponent } from './components/nox-time-picker/nox-time-picker.component';
import { NoxDateTimePickerComponent } from './components/nox-date-time-picker/nox-date-time-picker.component';

@NgModule({
  declarations: [
    NoxSearchableDropDownComponent,
    NoxTreeDropDownComponent,
    NoxDatePickerComponent,
    NoxTimePickerComponent,
    NoxDateTimePickerComponent,
    NoxTagsInputComponent,
    NoxDragAndDropUploaderComponent,
    NoxRepeaterComponent,    
    NoxTagsUploaderComponent,
    NoxTagsObjectListComponent,
    NoxImageComponent,
    NoxProgressComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NoxCoreModule,
    NoxTreeModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbAlertModule,
    JsonPipe,
    NgxSpinnerModule
  ],
  exports: [
    NoxSearchableDropDownComponent,
    NoxTreeDropDownComponent,
    NoxDatePickerComponent,
    NoxTimePickerComponent,
    NoxDateTimePickerComponent,
    NoxTagsInputComponent,
    NoxDragAndDropUploaderComponent,
    NoxRepeaterComponent,
    NoxTagsUploaderComponent,
    NoxTagsObjectListComponent,
    NoxImageComponent,
    NoxProgressComponent
  ],
  providers: []
})
export class NoxControlsModule { }
