import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NoxTagsUploaderFileAddedEvent } from './events/nox-tags-uploader-file-added-event';
import { NoxTagsUploaderFileRemovedEvent } from './events/nox-tags-uploader-file-removed-event';
import { NoxTagsUploaderFileLinkEvent } from './events/nox-tags-uploader-file-link-event';
import { FileInfo } from '../../../nox-core/classes/file-info';

@Component({
  selector: 'nox-tags-uploader',
  templateUrl: './nox-tags-uploader.component.html',
  styleUrls: ['./nox-tags-uploader.component.scss']
})
export class NoxTagsUploaderComponent {
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;

  private _fileInfos: FileInfo[] = [];

  @Input()
  get fileInfos(): FileInfo[] {
    return this._fileInfos;
  }
  set fileInfos(value: FileInfo[]) {
    this._fileInfos = value;
  }

  @Input() uploadButtonIconUrl: string = "assets/nox/components/drag-and-drop-uploader/images/drop-area-image.svg";
  @Input() uploadButtonText: string = "Upload";

  @Input() itemRemoveButtonIconUrl: string = "assets/nox/components/drag-and-drop-uploader/images/file-list-item-remove-button-icon.png";

  @Input() acceptedFileExtensions: string = "";
  @Input() showLinks: boolean = false;

  @Output() onFileAdded = new EventEmitter<NoxTagsUploaderFileAddedEvent>();
  @Output() onFileRemoved = new EventEmitter<NoxTagsUploaderFileRemovedEvent>();
  @Output() onFileLink = new EventEmitter<NoxTagsUploaderFileLinkEvent>();

  onUploadButtonClicked() {
    this.fileInput.nativeElement.click();
  }

  onFileInputChanged(event: any) {
    for (const file of event.target.files) {
      let fileExists = false;

      for (let i = 0; i < this.fileInfos.length; i++) {
        if (this.fileInfos[i].fileName == file.name) {
          fileExists = true;
          break;
        }
      }

      if (!fileExists) {
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
    }

    this.fileInput.nativeElement.value = "";
    event.target.files = null;
  }

  onItemRemoveButtonClicked(event: any, fileInfo: any) {
    const index = this._fileInfos.indexOf(fileInfo);
    if (index != -1) {
      const fileInfo = this.fileInfos[index];

      this.fileInfos.splice(index, 1);

      this.onFileRemoved.emit({
        fileInfo: fileInfo
      });      
    }
  }

  onItemClicked(fileInfo: FileInfo) {
    this.onFileLink.emit({
      fileInfo: fileInfo
    });
  }
}
