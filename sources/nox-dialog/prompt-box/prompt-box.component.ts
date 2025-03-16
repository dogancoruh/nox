import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NoxDialog } from '../dialog/nox-dialog';
import { DialogResult } from '../dialog/nox-dialog-result';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoxDialogConfigurationService } from '../services/nox-dialog-configuration.services';

@Component({
  selector: 'prompt-box',
  templateUrl: './prompt-box.component.html',
  styleUrls: ['./prompt-box.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PromptBoxComponent extends NoxDialog implements OnInit {
  imageInformation: string = "assets/nox/dialog/prompt-box/prompt-box-icon-check.png";
  imageWarning: string = "assets/nox/dialog/prompt-box/prompt-box-icon-warning.png";
  imageError: string = "assets/nox/dialog/prompt-box/prompt-box-icon-error.png";
  imageDelete: string = "assets/nox/dialog/prompt-box/prompt-box-icon-delete.png";

  saveActionText: string = "Save";
  createActionText: string = "Create";
  cancelActionText: string = "Cancel";

  value: string = "";
  originalValue: string = "";
  needsChange: boolean = false;
  maximumValueLength: number = 0;
  requiredValueLength: number = 0; // TODO: not implemented

  positiveButton: string = "save";

  constructor(override injector: Injector,
    private readonly dialogConfigurationService: NoxDialogConfigurationService) {
    super(injector);

    this.imageInformation = this.dialogConfigurationService.imageInformation;
    this.imageWarning = this.dialogConfigurationService.imageWarning;
    this.imageError = this.dialogConfigurationService.imageError;
    this.imageDelete = this.dialogConfigurationService.imageDelete;
    
    this.saveActionText = this.dialogConfigurationService.saveActionText;
    this.createActionText = this.dialogConfigurationService.createActionText;
    this.cancelActionText = this.dialogConfigurationService.cancelActionText;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.originalValue = this.value;
  }

  onButtonPositiveClicked(event: any) {
    this.doPositiveClick();
  }

  doPositiveClick() {
    this.resultType = DialogResult.Save;
    this.doResult();
  }

  onButtonCancelClicked() {
    this.resultType = DialogResult.Cancel;
    this.doResult();
  }

  onInputKeyEnterPressed() {
    this.doPositiveClick();
  }
}
