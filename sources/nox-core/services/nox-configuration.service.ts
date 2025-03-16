import { Injectable } from '@angular/core';
import { NoxCreateDisplayType } from '../enums/nox-create-display-type';
import { faChevronDown, faChevronRight, faEllipsisV, faEllipsisVertical, faEye } from '@fortawesome/free-solid-svg-icons';
import { NoxDebugLevel } from '../enums/nox-debug-level';
import { IdHelper } from '../classes/id-helper';
import { NoxHorizontalAlign } from '../enums/nox-horizontal-align';
import { NoxLeftRightAlign } from '../enums/nox-left-right-align';
import { NoxButtonAppearance } from '../enums/nox-button-appearance';

@Injectable({
  providedIn: 'root'
})
export class NoxConfigurationService {
  instanceId = IdHelper.createId(4);

  debugLevel: NoxDebugLevel = "none";

  dateDisplayFormat: string = "yyyy/MM/dd";
  dateTimeDisplayFormat: string = "yyyy/MM/dd HH:MM";
  dateWeekDays: string = "Sun,Mon,Tue,Wed,Thu,Fri,Sat";
  dateMonthShortNames: string = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec";
  dateMonthFullNames: string = "January,February,March,April,May,June,July,August,September,October,November,December";
  dateFirstDayOfWeek: number = 1;

  timeDisplayFormat: string = "HH:MM";
  timeMeridian: boolean = true;

  topicFormat: string = "{0} {1}";

  createTitleAction: string = "Create";
  addTitleAction: string = "Add";
  editTitleAction: string = "Edit";
  deleteTitleAction: string = "Delete";
  detailsTitleAction: string = "Details";

  createButtonAction: string = "Create";
  addButtonAction: string = "Add";
  editButtonAction: string = "Save";
  deleteButtonAction: string = "Delete";
  cancelButtonAction: string = "Cancel"
  backButtonAction: string = "Back";

  defaultCreateDisplayType: NoxCreateDisplayType = "create";

  tableActionContextButtonIcon: any = faEllipsisV;
  tableInitialEmptyText: string = "There is no record yet."
  tableSearchEmptyText: string = "No record found for search parameters.";
  tableLoadingText: string = "Loading...";
  tableFailedToGetDataErrorText: string = "Failed to get data";

  formCancelButtonAppearance: NoxButtonAppearance = "secondary";
  formValidationErrorRequiredText: string = "'{0}' field is required.";
  formValidationErrorMinLengthText: string = "You must enter at least {1} letters for '{0}' field.";
  formValidationErrorMaxLengthText: string = "You can enter maximum {1} letters for '{0}' field.";
  formValidationErrorEmailText: string = "Please enter a valid email address for '{0}' field.";
  formValidationErrorPatternText: string = "Please enter a valid format for '{0}' field.";
  formValidationErrorMatchText: string = "{0} and {1} are not matching."

  noneText: string = "None";
  allText: string = "All";

  baseUrl: string = "";

  passwordRevealIcon: any = faEye;

  treeIconNodeExpanded: any = faChevronDown;
  treeIconNodeCollapsed: any = faChevronRight;
  treeIconNodeContextMenu: any = faEllipsisVertical;

  pagerTotalRecordCountTextFormat: string = "Total records: {0}";
  pagerTotalRecordCountLocation: NoxLeftRightAlign = "right";

  userPageSettingsExpirationDays: number = 0;
}
