import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbTimeAdapter, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { DateTime } from 'luxon';
import { NgbTimeStringAdapter } from './nox-time-adapter';
import { NoxDateTimeService } from '../../../nox-core/services/nox-date-time.service';

@Component({
  selector: 'nox-time-picker',
  templateUrl: './nox-time-picker.component.html',
  styleUrl: './nox-time-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoxTimePickerComponent),
      multi: true
    }
  ]
})
export class NoxTimePickerComponent implements ControlValueAccessor {
  onChange: any = (value: any) => { };
  onTouched: any = () => { };
  disabled: boolean = false;

  private dateTime: DateTime | undefined;
  protected timeStruct: NgbTimeStruct | undefined;

  @Input()
  get value(): any {
    if (this.dateTime)
      return this.dateTimeService.toUTCtoISO(this.dateTime);
  }
  set value(val: any) {
    if (val) {
      this.dateTime = this.dateTimeService.toLocalFromISO(val);
      if (this.dateTime) {
        this.timeStruct = {
          hour: this.dateTime.hour,
          minute: this.dateTime.minute,
          second: this.dateTime.second
        };
      }
    }
  }

  @Input() timeFormat!: string;

  constructor(private readonly configurationService: NoxConfigurationService, private dateTimeService: NoxDateTimeService) {
    this.timeFormat = this.configurationService.timeDisplayFormat;
  }

  // ControlValueAccessor functions

  writeValue(obj: any): void {
    if (obj) {
      console.info("time picker writeValue", obj);

      this.dateTime = this.dateTimeService.toLocalFromISO(obj);
      if (this.dateTime) {
        this.timeStruct = {
          hour: this.dateTime.hour,
          minute: this.dateTime.minute,
          second: this.dateTime.second
        };
      }
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

  onTimePickerTimeSelect(timeStruct: any) {
    if (this.dateTime) {
      this.dateTime = this.dateTime.set({
        hour: timeStruct.hour,
        minute: timeStruct.minute,
        second: timeStruct.second
      });

      this.onChange(this.dateTimeService.toUTCtoISO(this.dateTime));

      this.onTouched();
    }
  }
}