import { Component, Injector } from "@angular/core";
import { NoxPageComponent } from "./nox-page.component";
import { NoxViewMode } from "../../enums/nox-view-mode";
import { StringHelper } from "../../classes/string-helper";
import { NoxFormMode } from "../../enums/nox-form-mode";
import { NoxCreateDisplayType } from "../../enums/nox-create-display-type";
import { NoxButtonAppearance } from "../../enums/nox-button-appearance";

@Component({
  selector: "nox-edit-page-component",
  template: ""
})
export class NoxEditPageComponent extends NoxPageComponent {
  protected mode: NoxViewMode = "none";

  protected get isModeCreate() { return this.mode == 'create' }
  protected get isModeEdit() { return this.mode == 'edit' }
  protected get isModeDelete() { return this.mode == 'delete' }

  protected createTitleAction: string = this.pagePreferencesService.createTitleAction;
  protected addTitleAction: string = this.pagePreferencesService.addTitleAction;
  protected editTitleAction: string = this.pagePreferencesService.editTitleAction;
  protected deleteTitleAction: string = this.pagePreferencesService.deleteTitleAction;
  protected detailsTitleAction: string = this.pagePreferencesService.detailsTitleAction;

  protected createButtonAction: string = this.pagePreferencesService.createButtonAction;
  protected addButtonAction: string = this.pagePreferencesService.addButtonAction;
  protected editButtonAction: string = this.pagePreferencesService.editButtonAction;
  protected deleteButtonAction: string = this.pagePreferencesService.deleteButtonAction;
  protected cancelButtonAction: string = this.pagePreferencesService.cancelButtonAction;
  protected backButtonAction: string = this.pagePreferencesService.backButtonAction;

  protected createDisplayType: NoxCreateDisplayType = this.pagePreferencesService.createDisplayType;

  private _topic: string = "";

  protected get topic(): string {
    return this._topic;
  }
  protected set topic(value: string) {
    this._topic = value;

    this.invalidateTitle();
  }

  private _topicFormat: string = this.configurationService.topicFormat;

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
      case "details": return this.detailsTitleAction;
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
      case "details": return "";
    }
  }

  protected get viewModeReadonly(): boolean {
    return this.mode == "delete";
  }

  protected get formCancelButtonText(): string {
    switch (this.mode) {
      case "none": return "---";
      case "create": return this.cancelButtonAction;
      case "edit": return this.cancelButtonAction;
      case "delete": return this.cancelButtonAction;
      case "details": return this.backButtonAction;
    }
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
      case "details": return "";
    }
  }

  protected get formCancelButtonAppearance(): NoxButtonAppearance {
    switch (this.mode) {
      case "none": return this.configurationService.formCancelButtonAppearance;
      case "create": return this.configurationService.formCancelButtonAppearance;
      case "edit": return this.configurationService.formCancelButtonAppearance;
      case "delete": return this.configurationService.formCancelButtonAppearance;
      case "details": return this.configurationService.formCancelButtonAppearance;
    }
  }

  protected get formSubmitButtonAppearance(): NoxButtonAppearance {
    switch (this.mode) {
      case "none": return "primary";
      case "create": return "primary";
      case "edit": return "primary";
      case "delete": return "danger";
      case "details": return "secondary"
    }
  }

  protected get formSubmitButtonClass(): string {
    switch (this.mode) {
      case "none": return "btn-primary";
      case "create": return "btn-primary";
      case "edit": return "btn-primary";
      case "delete": return "btn-danger";
      case "details": return "btn-secondary";
    }
  }

  protected get formMode(): NoxFormMode {
    switch (this.mode) {
      case "none": return "none";
      case "create": return "create";
      case "edit": return "edit";
      case "delete": return "delete";
      case "details": return "details";
    }
  }

  protected get formReadonly(): boolean {
    return this.mode == "delete" || this.mode == "details";
  }

  constructor(override injector: Injector) {
    super(injector);

    const data = this.activatedRoute.snapshot.data;
    if (data["mode"])
      this.mode = data["mode"];
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    if (this.pagePreferencesComponent != null) {
      this.createTitleAction = this.pagePreferencesComponent.createTitleAction ?? "";
      this.addTitleAction = this.pagePreferencesComponent.addTitleAction ?? "";
      this.editTitleAction = this.pagePreferencesComponent.editTitleAction ?? "";
      this.deleteTitleAction = this.pagePreferencesComponent.deleteTitleAction ?? "";

      this.createDisplayType = this.pagePreferencesComponent.createDisplayType ?? "create";

      if (this.pagePreferencesComponent.topic != undefined)
        this.topic = this.pagePreferencesComponent.topic;
      
      this.topicFormat = this.pagePreferencesComponent.topicFormat ?? "";

      this.invalidateTitle();

      this.createButtonAction = this.pagePreferencesComponent.createButtonAction ?? "";
      this.addButtonAction = this.pagePreferencesComponent.addButtonAction ?? "";
      this.editButtonAction = this.pagePreferencesComponent.editButtonAction ?? "";
      this.deleteButtonAction = this.pagePreferencesComponent.deleteButtonAction ?? "";
    }
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
        case "details":
          actionText = this.detailsTitleAction;
          break;
        default:
        case "none":
          actionText = "---";
          break;
      }

      this.title = StringHelper.formatString(this.topicFormat, actionText, this.topic);
    }
  }
}
