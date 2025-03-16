import { TranslationWidth } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { NoxDateParserFormatter } from './nox-date-parser-formatter';
import { DateTime } from 'luxon';
import { NoxDateTimeService } from '../../../nox-core/services/nox-date-time.service';

@Component({
  selector: 'nox-date-picker',
  templateUrl: './nox-date-picker.component.html',
  styleUrl: './nox-date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoxDatePickerComponent),
      multi: true
    },
    { provide: NgbDatepickerI18n, useClass: NoxDatePickerComponent },
    { provide: NgbDateParserFormatter, useClass: NoxDateParserFormatter }
  ]
})
export class NoxDatePickerComponent extends NgbDatepickerI18n implements ControlValueAccessor {
  onChange: any = (value: any) => { };
  onTouched: any = () => { };
  disabled: boolean = false;

  private dateTime: DateTime | undefined;
  protected dateStruct: NgbDateStruct | undefined;

  @Input()
  get value(): any {
    if (this.dateTime)
      return this.dateTimeService.toUTCtoISO(this.dateTime);
  }
  set value(val: any) {
    if (val) {
      this.dateTime = this.dateTimeService.toLocalFromISO(val);
      if (this.dateTime) {
        this.dateStruct = {
          day: this.dateTime.day,
          month: this.dateTime.month,
          year: this.dateTime.year
        };
      }
    }
  }

  @Input() dateFormat!: string;

  @Input() weekDays!: string;
  @Input() monthShortNames!: string;
  @Input() monthFullNames!: string;
  @Input() firstDayOfWeek: number = 1;

  constructor(private configurationService: NoxConfigurationService, private ngbDateParserFormatter: NgbDateParserFormatter, private dateTimeService: NoxDateTimeService) {
    super();

    this.dateFormat = this.configurationService.dateDisplayFormat;

    this.weekDays = this.configurationService.dateWeekDays;
    this.monthShortNames = this.configurationService.dateMonthShortNames;
    this.monthFullNames = this.configurationService.dateMonthFullNames;
    this.firstDayOfWeek = this.configurationService.dateFirstDayOfWeek;
  }

  // ControlValueAccessor functions

  writeValue(obj: any): void {
    if (obj) {
      console.info("date picker writeValue", obj);
      this.dateTime = this.dateTimeService.toLocalFromISO(obj);
      if (this.dateTime) {
        this.dateStruct = {
          day: this.dateTime.day,
          month: this.dateTime.month,
          year: this.dateTime.year
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

  onDatePickerDateSelect(dateStruct: NgbDate) {
    if (this.dateTime) {
      this.dateTime = this.dateTime.set({
        day: dateStruct.day,
        month: dateStruct.month,
        year: dateStruct.year
      });
    }else {
      this.dateTime = DateTime.fromObject({
        day: dateStruct.day,
        month: dateStruct.month,
        year: dateStruct.year
      });
    } 
    
    this.onChange(this.dateTimeService.toUTCtoISO(this.dateTime));

    this.onTouched();
  }

  // NgbDatepickerI18n functions

  override getWeekdayLabel(weekday: number, width?: TranslationWidth | undefined): string {
    const weekDayTokens = this.weekDays.split(",");
    return weekDayTokens[weekday - 1];
  }
  override getMonthShortName(month: number, year?: number | undefined): string {
    const monthShortNames = this.monthShortNames.split(",");
    return monthShortNames[month - 1];
  }
  override getMonthFullName(month: number, year?: number | undefined): string {
    const monthFullNames = this.monthFullNames.split(",");
    return monthFullNames[month - 1];
  }
  override getDayAriaLabel(date: NgbDateStruct): string {
    return "";
  }
}
