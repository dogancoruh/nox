import { TranslationWidth } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbDatepickerI18n, NgbDatepickerModule, NgbTimeStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { NoxDateParserFormatter } from './nox-date-parser-formatter';
import { DateTime } from 'luxon';
import { NoxDateTimePickerViewMode } from './nox-date-time-picker-view-mode';
import { NoxDateTimeService } from '../../../nox-core/services/nox-date-time.service';

@Component({
  selector: 'nox-date-time-picker',
  templateUrl: './nox-date-time-picker.component.html',
  styleUrl: './nox-date-time-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NoxDateTimePickerComponent),
      multi: true
    },
    { provide: NgbDatepickerI18n, useClass: NoxDateTimePickerComponent },
    { provide: NgbDateParserFormatter, useClass: NoxDateParserFormatter }
  ],
  standalone: true,
  imports: [
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule
  ]
})
export class NoxDateTimePickerComponent extends NgbDatepickerI18n implements ControlValueAccessor {
  onChange: any = (value: any) => { };
  onTouched: any = () => { };
  disabled: boolean = false;

  private dateTime: DateTime | undefined;
  protected dateStruct: NgbDateStruct | undefined;
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
        this.dateStruct = {
          day: this.dateTime.day,
          month: this.dateTime.month,
          year: this.dateTime.year
        };
       /*  this.timeStruct = {
          hour: this.dateTime!.hour,
          minute: this.dateTime!.minute,
          second: this.dateTime!.second
        }; */
      }
    }
  }

  @Input() viewMode: NoxDateTimePickerViewMode = "dateTime";
  @Input() dateFormat!: string;

  @Input() weekDays!: string;
  @Input() monthShortNames!: string;
  @Input() monthFullNames!: string;
  @Input() firstDayOfWeek: number = 1;

  constructor(private readonly configurationService: NoxConfigurationService,
              private readonly ngbDateParserFormatter: NgbDateParserFormatter,
              private readonly dateTimeService: NoxDateTimeService) {
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
      /* let dateTimeStr = obj;
      let regExp = /\-/gi;
      dateTimeStr = dateTimeStr.replaceAll(regExp, "/"); */
      this.dateTime = this.dateTimeService.toLocalFromISO(obj);
    } else {
      //this.dateTime = undefined;
    }

    if (this.dateTime) {
      this.dateStruct = {
        day: this.dateTime!.day,
        month: this.dateTime!.month,
        year: this.dateTime!.year
      };
      this.timeStruct = {
        hour: this.dateTime!.hour,
        minute: this.dateTime!.minute,
        second: this.dateTime!.second
      };
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
        year: dateStruct.year,
        hour: this.timeStruct?.hour,
        minute: this.timeStruct?.minute,
        second: this.timeStruct?.second
      });
    } else {
      this.dateTime = DateTime.fromObject({
        day: dateStruct.day,
        month: dateStruct.month,
        year: dateStruct.year
      });
    }

    this.onChange(this.dateTimeService.toUTCtoISO(this.dateTime));
  }

  onTimePickerTimeSelect(timeStruct: any) {
    if (this.dateTime) {
      this.dateTime = this.dateTime.set({
        hour: timeStruct.hour,
        minute: timeStruct.minute,
        second: timeStruct.second,
        day: this.dateStruct?.day,
        month: this.dateStruct?.month,
        year: this.dateStruct?.year
      });
    } else {
      this.dateTime = DateTime.fromObject({
        hour: timeStruct.hour,
        minute: timeStruct.minute,
        second: timeStruct.second
      });
    }

    this.onChange(this.dateTimeService.toUTCtoISO(this.dateTime));
  }

  // NgbDatepickerI18n functions

  override getWeekdayLabel(weekday: number, width?: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>): string {
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
