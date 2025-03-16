import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class NoxSettingsService {
  setString(name: string, value: string, expires?: number | Date) {
    Cookie.set(name, value, expires);
  }

  getString(name: string, defaultValue?: string): string {
    if (Cookie.check(name)) {
      return Cookie.get(name);
    } else {
      if (defaultValue != undefined)
        return defaultValue;
      else
        return "";
    }
  }

  setInteger(name: string, value: number, expires?: number | Date) {
    Cookie.set(name, value.toString(), expires);
  }

  getInteger(name: string, defaultValue?: number): number {
    if (Cookie.check(name)) {
      return parseInt(Cookie.get(name));
    } else {
      if (defaultValue != undefined)
        return defaultValue;
      else
        return 0;
    }
  }

  setFloat(name: string, value: number, expires?: number | Date) {
    Cookie.set(name, value.toString(), expires);
  }

  getFloat(name: string, defaultValue?: number): number {
    if (Cookie.check(name)) {
      return parseFloat(Cookie.get(name));
    } else {
      if (defaultValue != undefined)
        return defaultValue;
      else
        return 0.0;
    }
  }

  setBoolean(name: string, value: boolean, expires?: number | Date) {
    const valueStr = value.toString().toLowerCase();
    Cookie.set(name, valueStr, expires);
  }

  getBoolean(name: string, defaultValue?: boolean): boolean {
    if (Cookie.check(name)) {
      return Cookie.get(name) == "true";
    } else {
      if (defaultValue != undefined)
        return defaultValue;
      else
        return false;
    }
  }
}
