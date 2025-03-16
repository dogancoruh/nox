import { Component, EventEmitter, HostListener, Input, Output, ViewChild, forwardRef } from '@angular/core';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { NoxTagsObjectListRemoveTagEvent } from './events/nox-tags-object-list-remove-tag.event';

@Component({
  selector: 'nox-tags-object-list',
  templateUrl: './nox-tags-object-list.component.html',
  styleUrl: './nox-tags-object-list.component.scss'
})
export class NoxTagsObjectListComponent {
  @ViewChild("tagInput") protected tagInput!: any;

  @Input() tagObjects: any[] = [];
  @Input() tagDisplayFieldName: string = "name";
  @Input() addTagButtonText: string = "Add";
  @Input() disabled: boolean = false;

  @Output() onAddTag = new EventEmitter();
  @Output() onRemoveTag: EventEmitter<NoxTagsObjectListRemoveTagEvent> = new EventEmitter<NoxTagsObjectListRemoveTagEvent>();

  constructor() {

  }

  onTagRemoveButtonClicked(event: any, tagObject: any) {
    const tagObjectIndex = this.tagObjects.indexOf(tagObject);
    if (tagObjectIndex != -1) {
      this.onRemoveTag.emit({
        tag: tagObject
      });

      this.tagObjects.splice(tagObjectIndex, 1);
    }
  }

  onTagAddButtonClicked() {
    this.onAddTag.emit();
  }

  getTagObjectText(tagObject: any) {
    if (tagObject[this.tagDisplayFieldName])
      return tagObject[this.tagDisplayFieldName];
    else
      return "";
  }

  @HostListener("click") onClick() {
    this.tagInput?.nativeElement.focus();
  }

  addTag(tagObject: any) {
    this.tagObjects.push(tagObject);
  }
}
