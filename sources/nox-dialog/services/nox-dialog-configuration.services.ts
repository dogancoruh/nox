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
export class NoxDialogConfigurationService {
  instanceId = IdHelper.createId(4);

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
}
