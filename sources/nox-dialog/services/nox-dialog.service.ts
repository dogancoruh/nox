import { Injectable } from '@angular/core';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogButton } from '../dialog/nox-dialog-button';
import { DialogIcon } from '../dialog/nox-dialog-icon';
import { NoxDialogShowMessageArgs } from './nox-dialog-show-message-args';

@Injectable({
  providedIn: 'root'
})
export class NoxDialogService {
  constructor(private readonly modalService: NgbModal) {

  }

  showMessageWithTitle(title: string, message?: string, args?: NoxDialogShowMessageArgs): void {
    let args_: any = new NoxDialogShowMessageArgs();

    if (args) {
      if (args.size) args_.size = args.size;
      if (args.backdrop) args_.backdrop = args.backdrop;
      if (args.icon) args_.icon = args.icon;
      if (args.buttons) args_.buttons = args.buttons;
      if (args.closeCallback) args_.closeCallback = args.closeCallback;
    }

    const dialog = this.modalService.open(MessageBoxComponent, {
      centered: true,
      size: args_.size,
      backdrop: args_.backdrop,
      keyboard: args_.keyboard
    });
    dialog.componentInstance.title = title;
    dialog.componentInstance.message = message;
    dialog.componentInstance.buttons = args_.buttons;
    dialog.componentInstance.icon = args_.icon;
    dialog.componentInstance.onResult.subscribe((result: any) => {
      dialog.close();

      if (args_?.closeCallback)
        args_.closeCallback(result.type);
    });
  };

  showMessage(message?: string, args?: NoxDialogShowMessageArgs): void {
    let args_: any = new NoxDialogShowMessageArgs();

    if (args) {
      if (args.size) args_.size = args.size;
      if (args.backdrop) args_.backdrop = args.backdrop;
      if (args.icon) args_.icon = args.icon;
      if (args.buttons) args_.buttons = args.buttons;
      if (args.closeCallback) args_.closeCallback = args.closeCallback;
    }

    const dialog = this.modalService.open(MessageBoxComponent, {
      centered: true,
      size: args_.size,
      backdrop: args_.backdrop,
      keyboard: args_.keyboard
    });    
    dialog.componentInstance.message = message;
    dialog.componentInstance.buttons = args_.buttons;
    dialog.componentInstance.icon = args_.icon;
    dialog.componentInstance.onResult.subscribe((result: any) => {
      dialog.close();

      if (args_?.closeCallback)
        args_.closeCallback(result.type);
    });
  }
}
