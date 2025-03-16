import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileInfo } from '../../../nox-core/classes/file-info';
import { NoxDragAndDropUploaderFileAddedEvent } from './events/nox-drag-and-drop-uploader-file-added-event';
import { NoxDragAndDropUploaderFileRemovedEvent } from './events/nox-drag-and-drop-uploader-file-removed-event';
import { Router } from '@angular/router';
import { NoxDragAndDropUploaderFileLinkEvent } from './events/nox-drag-and-drop-uploader-file-link-event';
import { StringHelper } from '../../../nox-core/classes/string-helper';

@Component({
  selector: 'nox-drag-and-drop-uploader',
  templateUrl: './nox-drag-and-drop-uploader.component.html',
  styleUrls: ['./nox-drag-and-drop-uploader.component.scss']
})
export class NoxDragAndDropUploaderComponent {
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;

  private _fileInfos: FileInfo[] = [];

  @Input()
  get fileInfos(): FileInfo[] {
    return this._fileInfos;
  }
  set fileInfos(value: FileInfo[]) {
    this._fileInfos = value;
  }

  @Input() acceptedFileExtensions: string = "";

  @Input() multiple: boolean = false;
  @Input() showLinks: boolean = false;

  @Input() dropAreaImageUrl: string = "assets/nox/components/drag-and-drop-uploader/images/drop-area-image.svg";
  @Input() dropAreaText: string = "Drag and drop file here";
  @Input() dropAreaOrText: string = "or";
  @Input() dropAreaBrowseButtonText: string = "Browse for file";
  @Input() dropAreaRemoveButtonText: string = "Remove File"

  @Input() fileListItemIconUrl: string = "assets/nox/components/drag-and-drop-uploader/images/file-list-item-icon.png";
  @Input() fileListItemRemoveButtonIconUrl: string = "assets/nox/components/drag-and-drop-uploader/images/file-list-item-remove-button-icon.png";

  @Output() onFileAdded = new EventEmitter<NoxDragAndDropUploaderFileAddedEvent>();
  @Output() onFileRemoved = new EventEmitter<NoxDragAndDropUploaderFileRemovedEvent>();
  @Output() onFileLink = new EventEmitter<NoxDragAndDropUploaderFileLinkEvent>();

  constructor(private router: Router) {

  }

  onFileDropped(event: any) {
    if (!this.multiple)
      this.fileInfos = [];

    for (const file of event.target.files) {
      const fileInfo = {
        text: file.name,
        fileName: file.name,
        fileSize: file.size,
        file: file
      };

      this.fileInfos.push(fileInfo);

      this.onFileAdded.emit({
        fileInfo: fileInfo
      })
    }

    this.fileInput.nativeElement.value = "";
    event.target.files = null;
  }

  onFileInputChanged(event: any) {
    if (!this.multiple)
      this.fileInfos = [];

    for (const file of event.target.files) {
      const fileInfo = {
        text: file.name,
        fileName: file.name,
        fileSize: file.size,
        file: file
      };

      this.fileInfos.push(fileInfo);

      this.onFileAdded.emit({
        fileInfo: fileInfo
      });
    }

    this.fileInput.nativeElement.value = "";
    event.target.files = null;
  }

  onFileListRemoveButtonClicked(event: any, index: number) {
    const fileInfo = this.fileInfos[index];

    this.fileInfos.splice(index, 1);

    this.onFileRemoved.emit({
      fileInfo: fileInfo
    });
  }

  formatBytes(bytes: number | undefined, decimals = 2) {
    if (!bytes || bytes === 0) {
      return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[2];
  }

  isInputVisible() {
    if (!this.multiple) {
      return this.fileInfos && this.fileInfos.length == 0;
    } else {
      return true;
    }
  }

  isRemoveSingleFileButtonVisible() {
    if (!this.multiple) {
      return this.fileInfos && this.fileInfos.length > 0;
    } else {
      return false;
    }
  }

  isUploadFileButtonVisible() {
    if (!this.multiple) {
      return !this.fileInfos || this.fileInfos.length == 0;
    } else {
      return true;
    }
  }

  hasSingleFileName() {
    if (!this.multiple) {
      return this.fileInfos && this.fileInfos.length > 0;
    } else {
      return false;
    }
  }

  getSingleFileName() {
    if (this.fileInfos) {
      if (this.fileInfos.length > 0) {
        var text = this.fileInfos[0].fileName;
        
        if (this.fileInfos[0].text)
          text = this.fileInfos[0].text;
        
        return StringHelper.ellipses(text, 64, "fromBeginning");
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  onRemoveSingleFileButtonClicked() {
    const fileInfo = this.fileInfos[0];

    this.fileInfos.splice(0, 1);

    this.onFileRemoved.emit({
      fileInfo: fileInfo
    });
  }

  onFileLinkClicked(fileInfo: FileInfo | null = null) {
    var args = new NoxDragAndDropUploaderFileLinkEvent();

    if (fileInfo)
      args.fileInfo = fileInfo;
    else
      args.fileInfo = this.fileInfos[0];

    this.onFileLink.emit(args);
  }
}
