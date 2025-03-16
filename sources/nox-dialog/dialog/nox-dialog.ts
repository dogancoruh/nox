import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Injector, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DialogButton } from "./nox-dialog-button";
import { DialogIcon } from "./nox-dialog-icon";
import { DialogResult } from "./nox-dialog-result";
import { DialogMode } from "./nox-dialog-mode";
import { NoxConfigurationService } from "../../nox-core/services/nox-configuration.service";
import { NoxCreateDisplayType } from '../../nox-core/enums/nox-create-display-type';
import { StringHelper } from '../../nox-core/classes/string-helper';
import { NoxFormMode } from '../../nox-core/enums/nox-form-mode';
import { NoxButtonAppearance } from '../../nox-core/enums/nox-button-appearance';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrModule, ToastrService } from 'ngx-toastr';
import { NoxAuthService } from '../../nox-auth/services/nox-auth.service';

@Component({
  template: "",
  standalone: true
})
export class NoxDialog implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  protected configurationService!: NoxConfigurationService;
  protected activeModal!: NgbActiveModal;
  protected spinnerService!: NgxSpinnerService;
  protected authService!: NoxAuthService;
  protected readonly router: Router;
  protected readonly changeDetectorRef: ChangeDetectorRef;
  protected readonly toastrService: ToastrService;

  onResult = new EventEmitter();

  id: string = "";
  title: string = "";
  message: string = "";
  errorMessage: string = "";
  buttons: DialogButton = DialogButton.None;

  disabled: boolean = false;
  loaderVisible: boolean = false;

  icon: DialogIcon = DialogIcon.None;
  resultType: DialogResult = DialogResult.None;

  private _mode: DialogMode = "none";

  public get mode(): DialogMode {
    return this._mode;
  }
  public set mode(value: DialogMode) {
    this._mode = value;
    this.invalidateTitle();
  }

  protected get isModeCreate() { return this.mode == 'create' }
  protected get isModeEdit() { return this.mode == 'edit' }
  protected get isModeDelete() { return this.mode == 'delete' }

  protected createTitleAction: string;
  protected addTitleAction: string;
  protected editTitleAction: string;
  protected deleteTitleAction: string;

  protected createButtonAction: string;
  protected addButtonAction: string;
  protected editButtonAction: string;
  protected deleteButtonAction: string;

  protected createDisplayType: NoxCreateDisplayType;

  private _topic: string = "";

  protected get topic(): string {
    return this._topic;
  }
  protected set topic(value: string) {
    this._topic = value;

    this.invalidateTitle();
  }

  private _topicFormat!: string;

  protected get topicFormat(): string {
    return this._topicFormat;
  }
  protected set topicFormat(value: string) {
    this._topicFormat = value;

    this.invalidateTitle();
  }

  protected get titleText(): string {
    switch (this.mode) {
      case "none": return "---";
      case "create":
        if (this.createDisplayType == "create")
          return this.createTitleAction;
        else
          return this.addTitleAction;
      case "edit": return this.editTitleAction;
      case "delete": return this.deleteTitleAction;
    }
  }

  protected get actionText(): string {
    switch (this.mode) {
      case "none": return "---";
      case "create":
        if (this.createDisplayType == "create")
          return this.createButtonAction;
        else
          return this.addButtonAction;
      case "edit": return this.editButtonAction;
      case "delete": return this.deleteButtonAction;
    }
  }

  protected get viewModeReadonly(): boolean {
    return this.mode == "delete" || this.disabled;
  }

  protected get formSubmitButtonText(): string {
    switch (this.mode) {
      case "none": return "---";
      case "create":
        if (this.createDisplayType == "create")
          return this.createButtonAction;
        else
          return this.addButtonAction;
      case "edit": return this.editButtonAction;
      case "delete": return this.deleteButtonAction;
    }
  }

  protected get formSubmitButtonAppearance(): NoxButtonAppearance {
    switch (this.mode) {
      case "none": return "primary";
      case "create": return "primary";
      case "edit": return "primary";
      case "delete": return "danger";
    }
  }

  protected get formSubmitButtonClass(): string {
    switch (this.mode) {
      case "none": return "btn-primary";
      case "create": return "btn-primary";
      case "edit": return "btn-primary";
      case "delete": return "btn-danger";
    }
  }

  protected get formMode(): NoxFormMode {
    switch (this.mode) {
      case "none": return "none";
      case "create": return "create";
      case "edit": return "edit";
      case "delete": return "delete";
    }
  }

  protected get formReadonly(): boolean {
    return this.mode == "delete";
  }

  constructor(protected injector: Injector) {
    this.configurationService = this.injector.get(NoxConfigurationService);
    this.activeModal = this.injector.get(NgbActiveModal);
    this.spinnerService = this.injector.get(NgxSpinnerService);
    this.router = this.injector.get(Router);
    this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
    this.toastrService = this.injector.get(ToastrService);

    this.createTitleAction = this.configurationService.createTitleAction;
    this.addTitleAction = this.configurationService.addTitleAction;
    this.editTitleAction = this.configurationService.editTitleAction;
    this.deleteTitleAction = this.configurationService.deleteTitleAction;

    this.createButtonAction = this.configurationService.createButtonAction;
    this.addButtonAction = this.configurationService.addButtonAction;
    this.editButtonAction = this.configurationService.editButtonAction;
    this.deleteButtonAction = this.configurationService.deleteButtonAction;

    this.createDisplayType = this.configurationService.defaultCreateDisplayType;

    this.topicFormat = this.configurationService.topicFormat;

    this.authService = this.injector.get(NoxAuthService);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {

  }

  invalidateTitle() {
    if (this.topic && this.topicFormat) {
      let actionText: string = "";
      switch (this.mode) {
        case "create":
          if (this.createDisplayType == "create")
            actionText = this.createTitleAction;
          else
            actionText = this.addTitleAction;
          break;
        case "edit":
          actionText = this.editTitleAction;
          break;
        case "delete":
          actionText = this.deleteTitleAction;
          break;
        default:
        case "none":
          actionText = "---";
          break;
      }

      this.title = StringHelper.formatString(this.topicFormat, actionText, this.topic);
    }
  }

  disableControls() {
    this.disabled = true;
  }

  enableControls() {
    this.disabled = false;
  }

  showLoader() {
    this.loaderVisible = true;
  }

  hideLoader() {
    this.loaderVisible = false;
  }

  close() {
    this.activeModal.close({
      result: this.resultType
    });
  }

  doResult(resultType?: DialogResult, data?: any) {
    if (resultType)
      this.resultType = resultType;

    this.onResult.emit({
      type: this.resultType,
      data: data
    });
  }

  onCloseButtonClicked() {
    this.doResult(DialogResult.None);
  }

  onCancelButtonClicked() {
    this.doResult(DialogResult.Cancel);
  }

  protected showSpinner(): void {
    this.spinnerService.show();
  }

  protected hideSpinner(): void {
    this.spinnerService.hide();
  }

  protected onShowSpinner() {
    this.showSpinner();
  }

  protected onHideSpinner() {
    this.hideSpinner();
  }

  protected navigate(url: string) {
    this.router.navigate([url]);
  }

  protected navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }

  protected detectChanges() {
    this.changeDetectorRef.detectChanges();
  }

  // toastr functions
  protected showToastr<ConfigPayload = any>(message?: string, title?: string, override?: Partial<IndividualConfig<ConfigPayload>>, type?: string) {
    this.toastrService.show(message, title, override, type);
  }

  protected showToasterSuccess(message?: string | undefined, title?: string | undefined) {
    this.toastrService.success(message, title);
  }

  protected showToasterInfo(message?: string | undefined, title?: string | undefined) {
    this.toastrService.info(message, title);
  }

  protected showToasterWarning(message?: string | undefined, title?: string | undefined) {
    this.toastrService.warning(message, title);
  }

  protected showToasterError(message?: string | undefined, title?: string | undefined) {
    this.toastrService.error(message, title);
  }

  protected clearToaster() {
    this.toastrService.clear();
  }

  hasRole(roleName: string): boolean {
    return this.authService.hasRole(roleName);
  }

  hasAuthority(authorityName: string): boolean {
    return this.authService.hasAuthority(authorityName);
  }
}
