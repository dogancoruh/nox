import { Injectable } from '@angular/core';
import { NoxAuthService } from '../../nox-auth/services/nox-auth.service';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class NoxDateTimeService {

  get timeZone(): number {
    return this.authService.getTimeZone();
  }

  constructor(private readonly authService: NoxAuthService
  ) {

  }

  toLocal(dateTime: DateTime): DateTime {
    //console.warn("toLocal: ", this.authService.getTimeZone());
    return dateTime.plus({
      minutes: this.authService.getTimeZone()
    });
  }

  toLocalFromISO(date: string): DateTime {
    const utcTimeZone = (this.authService.getTimeZone() / 60);
    let zone = "";
    if (utcTimeZone >= 0)
      zone = "UTC+" + utcTimeZone
    else
      zone = "UTC" + utcTimeZone

    return this.toLocal(DateTime.fromISO(date, {
      setZone: true,
      zone: zone
    }));
  }

  toUTC(dateTime: DateTime): DateTime {
    //console.warn("toUTC: ", this.authService.getTimeZone());
    return dateTime.minus({
      minutes: this.authService.getTimeZone()
    });
  }

  toUTCtoISO(dateTime: DateTime): string | null {
    return this.toUTC(dateTime).toISO();
  }

  getISODateFromText(dateName: string): string | null {
    if (dateName == "today") {
      return this.toUTCtoISO(DateTime.now());
    } else if (dateName.includes("day") ||
      dateName.includes("days") ||
      dateName.includes("month") ||
      dateName.includes("months") ||
      dateName.includes("year") ||
      dateName.includes("years")) {
      // check date operation
      let operatorType = "";
      let operatorIndex = 0;
      if (dateName.startsWith("-")) {
        operatorType = "minus";
        operatorIndex++;
      } else if (dateName.startsWith("+")) {
        operatorType = "plus";
        operatorIndex++;
      } else {
        operatorType = "plus";
      }

      // get value information
      let valueType = "";
      let valueIndex = -1;
      if (dateName.includes("day")) {
        valueIndex = dateName.indexOf("day");
        valueType = "day";
      } else if (dateName.includes("month") && !dateName.includes("months")) {
        valueIndex = dateName.indexOf("month");
        valueType = "month";
      } else if (dateName.includes("year") && !dateName.includes("years")) {
        valueIndex = dateName.indexOf("year");
        valueType = "year";
      }

      if (operatorType != "" && valueType != "" && valueIndex != -1) {
        const valueStr = dateName.substring(operatorIndex, valueIndex);
        const value = Number.parseInt(valueStr);

        let date = DateTime.now();
        if (operatorType == "plus") {
          if (valueType == "day") {
            date = date.plus({
              day: value
            });
          } else if (valueType == "month") {
            date = date.plus({
              month: value
            });
          } else if (valueType == "year") {
            date = date.plus({
              year: value
            });
          }
        } else if (operatorType == "minus") {
          if (valueType == "day") {
            date = date.minus({
              day: value
            });
          } else if (valueType == "month") {
            date = date.minus({
              month: value
            });
          } else if (valueType == "year") {
            date = date.minus({
              year: value
            });
          }
        }

        return this.toUTCtoISO(date);
      } else {
        throw new Error("Invalid date text");
      }
    } else {
      throw new Error("Unsupported or invalid date text");
    }
  }
}
