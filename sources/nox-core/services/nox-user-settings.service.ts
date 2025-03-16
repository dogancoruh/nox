import { Injectable } from '@angular/core';
import { NoxSettingsService } from './nox-settings.service';
import { NoxAuthService } from '../../nox-auth/services/nox-auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoxUserSettingsService {
  constructor(private readonly settingsService: NoxSettingsService,
              private readonly authService: NoxAuthService,
              private readonly activatedRoute: ActivatedRoute) {

  }

  setString(name: string, value: string, expires?: number | Date) {
    this.settingsService.setString(this.getNameWithUserId(name), value, expires);
  }

  getString(name: string, defaultValue?: string): string {
    return this.settingsService.getString(this.getNameWithUserId(name), defaultValue);
  }

  setInteger(name: string, value: number, expires?: number | Date) {
    this.settingsService.setInteger(this.getNameWithUserId(name), value, expires);
  }

  getInteger(name: string, defaultValue?: number): number {
    return this.settingsService.getInteger(this.getNameWithUserId(name), defaultValue);
  }

  setFloat(name: string, value: number, expires?: number | Date) {
    this.settingsService.setFloat(this.getNameWithUserId(name), value, expires);
  }

  getFloat(name: string, defaultValue?: number): number {
    return this.settingsService.getFloat(this.getNameWithUserId(name), defaultValue);
  }

  setBoolean(name: string, value: boolean, expires?: number | Date) {
    this.settingsService.setBoolean(this.getNameWithUserId(name), value, expires);
  }

  getBoolean(name: string, defaultValue?: boolean): boolean {
    return this.settingsService.getBoolean(this.getNameWithUserId(name), defaultValue);
  }

  getNameWithUserId(name: string): string {
    var userId = this.authService.user.id;
    userId = userId.replaceAll("-", "_");

    return `${userId}_${name}`;
  }
}
