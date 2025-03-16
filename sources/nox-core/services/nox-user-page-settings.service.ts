import { EventEmitter, Injectable } from '@angular/core';
import { NoxPageActionButton } from '../components/nox-page-action-button/nox-page-action-button';
import { Cookie } from 'ng2-cookies';
import { NoxSettingsService } from './nox-settings.service';
import { NoxAuthService } from '../../nox-auth/services/nox-auth.service';
import { Router } from '@angular/router';
import { NoxConfigurationService } from './nox-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class NoxUserPageSettingsService {
  constructor(private readonly settingsService: NoxSettingsService,
              private readonly configurationService: NoxConfigurationService,
              private readonly authService: NoxAuthService,
              private readonly router: Router) {

  }

  setString(name: string, value: string, expires?: number | Date) {
    this.settingsService.setString(this.getNameWithUrlAndUserId(name), value, this.getExpiresOrDefault(expires));
  }

  getString(name: string, defaultValue?: string): string {
    return this.settingsService.getString(this.getNameWithUrlAndUserId(name), defaultValue);
  }

  setInteger(name: string, value: number, expires?: number | Date) {
    this.settingsService.setInteger(this.getNameWithUrlAndUserId(name), value, this.getExpiresOrDefault(expires));
  }

  getInteger(name: string, defaultValue?: number): number {
    return this.settingsService.getInteger(this.getNameWithUrlAndUserId(name), defaultValue);
  }

  setFloat(name: string, value: number, expires?: number | Date) {
    this.settingsService.setFloat(this.getNameWithUrlAndUserId(name), value, this.getExpiresOrDefault(expires));
  }

  getFloat(name: string, defaultValue?: number): number {
    return this.settingsService.getFloat(this.getNameWithUrlAndUserId(name), defaultValue);
  }

  setBoolean(name: string, value: boolean, expires?: number | Date) {
    this.settingsService.setBoolean(this.getNameWithUrlAndUserId(name), value, this.getExpiresOrDefault(expires));
  }

  getBoolean(name: string, defaultValue?: boolean): boolean {
    return this.settingsService.getBoolean(this.getNameWithUrlAndUserId(name), defaultValue);
  }

  getNameWithUrlAndUserId(name: string): string {
    var userId = this.authService.user?.id?.toString().toLowerCase() ?? "";
    userId = userId.replaceAll("-","_");

    var url = this.router.url;

    const questionMarkIndex = url.indexOf("?");
    if (questionMarkIndex != -1) {
      url = url.substring(0, questionMarkIndex);
    }

    url = url.replaceAll("/", "_");
    url = url.replaceAll("-", "_");
    url = url.toLowerCase();

    return `${userId}${url}_${name}`;
  }

  getExpiresOrDefault(expires?: number | Date) : number | Date {
    if (expires)
      return expires;
    else
      return this.configurationService.userPageSettingsExpirationDays;
  }
}
