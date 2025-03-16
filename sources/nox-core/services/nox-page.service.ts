import { EventEmitter, Injectable } from '@angular/core';
import { NoxPageActionButton } from '../components/nox-page-action-button/nox-page-action-button';

@Injectable({
  providedIn: 'root'
})
export class NoxPageService {
  onActionButton = new EventEmitter();

  constructor() { }

  doActionButton(actionButton: NoxPageActionButton) {
    this.onActionButton.emit({
      actionButton: actionButton
    });
  }
}
