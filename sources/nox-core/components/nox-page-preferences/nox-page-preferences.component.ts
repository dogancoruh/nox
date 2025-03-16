import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NoxBreadcrumbItemsComponent } from '../nox-breadcrumb/nox-breadcrumb-items.component';
import { NoxBreadcrumbItem } from '../nox-breadcrumb/nox-breadcrumb-item';
import { NoxConfigurationService } from '../../services/nox-configuration.service';
import { NoxCreateDisplayType } from '../../enums/nox-create-display-type';
import { NoxPageActionButtonsComponent } from '../nox-page-action-button/nox-page-action-buttons.component';
import { NoxPageActionButton } from '../nox-page-action-button/nox-page-action-button';

@Component({
  selector: 'nox-page-preferences',
  template: ""
})
export class NoxPagePreferencesComponent implements AfterContentInit, OnChanges {
  @ContentChild(NoxBreadcrumbItemsComponent) breadcrumbItemsComponent!: NoxBreadcrumbItemsComponent;
  @ContentChild(NoxPageActionButtonsComponent) actionButtonsComponent!: NoxPageActionButtonsComponent;

  @Input() title?: string = undefined;
  @Input() titleVisible?: boolean = true;

  @Input() topic?: string = undefined;
  @Input() topicFormat?: string;

  @Input() section?: string = undefined;

  @Input() createTitleAction: string;
  @Input() addTitleAction: string;
  @Input() editTitleAction: string;
  @Input() deleteTitleAction: string;

  @Input() createButtonAction?: string;
  @Input() addButtonAction?: string;
  @Input() editButtonAction?: string;
  @Input() deleteButtonAction?: string;

  @Input() createDisplayType: NoxCreateDisplayType = "create";

  @Output() onChange = new EventEmitter();

  breadcrumbItems: NoxBreadcrumbItem[] = [];
  actionButtons: NoxPageActionButton[] = [];

  constructor(private configurationService: NoxConfigurationService) {
    this.topicFormat = this.configurationService.topicFormat;

    this.createTitleAction = this.configurationService.createTitleAction;
    this.addTitleAction = this.configurationService.addTitleAction;
    this.editTitleAction = this.configurationService.editTitleAction;
    this.deleteTitleAction = this.configurationService.deleteTitleAction;

    this.createButtonAction = this.configurationService.createButtonAction;
    this.addButtonAction = this.configurationService.addButtonAction;
    this.editButtonAction = this.configurationService.editButtonAction;
    this.deleteButtonAction = this.configurationService.deleteButtonAction;
  }

  ngAfterContentInit(): void {
    if (this.breadcrumbItemsComponent != null) {
      this.breadcrumbItemsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.onChange.emit(changes);
      });
      this.breadcrumbItems = this.breadcrumbItemsComponent.items;
    }

    if (this.actionButtonsComponent != null) {
      this.actionButtonsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.onChange.emit(changes);
      });
      this.actionButtons = this.actionButtonsComponent.buttons;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
