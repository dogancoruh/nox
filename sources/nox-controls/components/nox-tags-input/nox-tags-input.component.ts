import { Component, HostListener, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';

@Component({
  selector: 'nox-tags-input',
  templateUrl: './nox-tags-input.component.html',
  styleUrl: './nox-tags-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoxTagsInputComponent),
      multi: true
    }
  ]
})
export class NoxTagsInputComponent implements ControlValueAccessor {
  @ViewChild("tagInput") tagInput!: any;

  onChange: any = (value: any) => { };
  onTouched: any = () => { };

  tags: string[] = [];

  @Input()
  get value(): string {
    return this.tags.toString();
  }
  set value(value_: string) {
    if (value_) {
      this.tags = [];
      var tagStrs = value_.split(",");
      for (let i = 0; i < tagStrs.length; i++)
        this.tags.push(tagStrs[i]);
    }
  }

  @Input() placeholder: string = "Enter a tag";
  @Input() placeholderWith: string = "100px";
  @Input() disabled: boolean = false;

  constructor(private configurationService: NoxConfigurationService) {

  }

  onTagRemoveButtonClicked(event: any, tag: string) {
    const tagIndex = this.tags.indexOf(tag);
    if (tagIndex != -1) {
      this.tags.splice(tagIndex, 1);

      this.onChange(this.tags.toString());
    }
  }

  onTagInputInputKeyDown(event: KeyboardEvent) {
    if (event.key == "Enter") {
      const tag = (event.target as HTMLInputElement).value;

      if (tag) {
        const tagIndex = this.tags.indexOf(tag);
        if (tagIndex == -1) {
          this.tags.push(tag);

          (event.target as HTMLInputElement).value = "";

          this.onChange(this.tags.toString());

          console.info(this.tags.toString())
        }
      }

      event.preventDefault();
    } else if (event.key == "Escape") {
      (event.target as HTMLInputElement).value = "";
    }
  }

  onTagInputInputBlur(event: any) {
    const tag = (event.target as HTMLInputElement).value;

      if (tag) {
        const tagIndex = this.tags.indexOf(tag);
        if (tagIndex == -1) {
          this.tags.push(tag);

          (event.target as HTMLInputElement).value = "";

          this.onChange(this.tags.toString());
        }
      }
  }

  @HostListener("click") onClick() {
    this.tagInput?.nativeElement.focus();
  }

  // ControlValueAccessor functions

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
