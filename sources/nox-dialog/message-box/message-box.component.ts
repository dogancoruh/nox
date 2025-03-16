import { Component, ElementRef, EventEmitter, Injector, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NoxDialog } from '../dialog/nox-dialog';
import { DialogButton } from '../dialog/nox-dialog-button';
import { DialogResult } from '../dialog/nox-dialog-result';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoxDialogConfigurationService } from '../services/nox-dialog-configuration.services';

@Component({
  selector: 'message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    FontAwesomeModule
  ]
})
export class MessageBoxComponent extends NoxDialog implements OnInit {
  imageInformation: string = "assets/nox/dialog/prompt-box/prompt-box-icon-check.png";
  imageWarning: string = "assets/nox/dialog/prompt-box/prompt-box-icon-warning.png";
  imageError: string = "assets/nox/dialog/prompt-box/prompt-box-icon-error.png";
  imageDelete: string = "assets/nox/dialog/prompt-box/prompt-box-icon-delete.png";

  saveActionText: string = "Save";
  createActionText: string = "Create";
  okActionText: string = "Ok";
  cancelActionText: string = "Cancel";
  deleteActionText: string = "Delete";
  yesActionText: string = "Yes";
  noActionText: string = "No";

  public get okButtonVisible(): boolean {
    return (this.buttons & DialogButton.Ok) == DialogButton.Ok;
  }
  public get saveButtonVisible(): boolean {
    return (this.buttons & DialogButton.Save) == DialogButton.Save;
  }
  public get deleteButtonVisible(): boolean {
    return (this.buttons & DialogButton.Delete) == DialogButton.Delete;
  }
  public get yesButtonVisible(): boolean {
    return (this.buttons & DialogButton.Yes) == DialogButton.Yes;
  }
  public get noButtonVisible(): boolean {
    return (this.buttons & DialogButton.No) == DialogButton.No;
  }
  public get cancelButtonVisible(): boolean {
    return (this.buttons & DialogButton.Cancel) == DialogButton.Cancel;
  }

  constructor(override injector: Injector,
    private readonly dialogConfigurationService: NoxDialogConfigurationService
  ) {
    super(injector);

    this.imageInformation = this.dialogConfigurationService.imageInformation;
    this.imageWarning = this.dialogConfigurationService.imageWarning;
    this.imageError = this.dialogConfigurationService.imageError;
    this.imageDelete = this.dialogConfigurationService.imageDelete;

    this.saveActionText = this.dialogConfigurationService.saveActionText;
    this.createActionText = this.dialogConfigurationService.createActionText;
    this.okActionText = this.dialogConfigurationService.okActionText;
    this.cancelActionText = this.dialogConfigurationService.cancelActionText;
    this.deleteActionText = this.dialogConfigurationService.deleteActionText;
    this.yesActionText = this.dialogConfigurationService.yesActionText;
    this.noActionText = this.dialogConfigurationService.noActionText;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    let element: any = document.getElementsByClassName("btn-primary")[0];
    element.focus();
  }

  onButtonClicked(event: any): void {
    switch (event.currentTarget.getAttribute("result")) {
      case "ok": this.resultType = DialogResult.Ok; break;
      case "save": this.resultType = DialogResult.Save; break;
      case "delete": this.resultType = DialogResult.Delete; break;
      case "yes": this.resultType = DialogResult.Yes; break;
      case "no": this.resultType = DialogResult.No; break;
      case "cancel": this.resultType = DialogResult.Cancel; break;
    }

    this.doResult();
  }
}
