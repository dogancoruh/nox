import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NoxBreadcrumbItem } from '../components/nox-breadcrumb/nox-breadcrumb-item';
import { NoxConfigurationService } from './nox-configuration.service';
import { NoxCreateDisplayType } from '../enums/nox-create-display-type';
import { NoxPageActionButton } from '../components/nox-page-action-button/nox-page-action-button';

@Injectable({
  providedIn: 'root'
})
export class NoxPagePreferencesService {
  title$ = new Subject<string | undefined>();
  titleVisible$ = new Subject<boolean | undefined>();
  section$ = new Subject<string | undefined>();
  breadcrumbItems$ = new Subject<NoxBreadcrumbItem[]>();
  actionButtons$ = new Subject<NoxPageActionButton[]>();

  createTitleAction: string;
  addTitleAction: string;
  editTitleAction: string;
  deleteTitleAction: string;
  detailsTitleAction: string;

  createButtonAction: string;
  addButtonAction: string;
  editButtonAction: string;
  deleteButtonAction: string;
  cancelButtonAction: string;
  backButtonAction: string;

  createDisplayType: NoxCreateDisplayType = "create";
;
;

  constructor(private configurationService: NoxConfigurationService) {
    this.createTitleAction = this.configurationService.createTitleAction;
    this.addTitleAction = this.configurationService.addTitleAction;
    this.editTitleAction = this.configurationService.editTitleAction;
    this.deleteTitleAction = this.configurationService.deleteTitleAction;
    this.detailsTitleAction = this.configurationService.detailsTitleAction;

    this.createButtonAction = this.configurationService.createButtonAction;
    this.addButtonAction = this.configurationService.addButtonAction;
    this.editButtonAction = this.configurationService.editButtonAction;
    this.deleteButtonAction = this.configurationService.deleteButtonAction;
    this.cancelButtonAction = this.configurationService.cancelButtonAction;
    this.backButtonAction = this.configurationService.backButtonAction;

    this.createDisplayType = this.configurationService.defaultCreateDisplayType;
  }
}
