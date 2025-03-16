import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { LoginResult as LoginResponse } from '../data/login-response';
import { LoginRequest } from '../data/login-request';
import { RegisterRequest } from '../data/register-request';
import { RegisterResponse } from '../data/register-response';
import { CryptoService } from '../../nox-core/services/crypto.service';
import { UseRefreshTokenResponse } from '../data/use-refresh-token-response';
import { UseRefreshTokenRequest } from '../data/use-refresh-token-request';
import { ChangePasswordResponse } from '../data/change-password-response';
import { ChangePasswordRequest } from '../data/change-password-request';
import { MailConfirmationRequest } from '../data/mail-confirmation-request';
import { MailConfirmationResponse } from '../data/mail-confirmation-response';
import { CodeConfirmationRequest } from '../data/code-confirmation-request';
import { CodeConfirmationResponse } from '../data/code-confirmation-response';
import { ResetPasswordRequest } from '../data/reset-password-request';
import { ResetPasswordResponse } from '../data/reset-password-response';
import { jwtDecode } from "jwt-decode";
import { UserResetPasswordRequest } from '../data/user-reset-password';
import { UserResetPasswordResponse } from '../data/user-reset-password-response';
import { NoxConfigurationService } from '../../nox-core/services/nox-configuration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from '../data/auth-user';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { ResetPasswordByUserRequest } from '../data/reset-password-by-user-request';
import { ResetPasswordByUserResponse } from '../data/reset-password-by-user-response';
import { DateTime } from 'luxon';
import { NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN } from './nox-auth.interceptor.shared';

@Injectable({
  providedIn: 'root',
})
export class NoxAuthService {
  rootUrl: string = "";
  clientType: string = "web"
  loginUrl: string = "/login";
  logoutUrl: string = "/logout";
  unauthorizedUrl: string = "/unauthorized";

  get clientId(): string | null {
    if (localStorage.getItem("session_id")) {
      return localStorage.getItem("session_id");
    } else {
      const sessionId = IdHelper.createId(16);
      localStorage.setItem("session_id", sessionId);
      return sessionId;
    }
  }

  getAccessToken(): string {
    let encryptedToken = localStorage.getItem("access-token");
    if (encryptedToken != undefined && encryptedToken) {
      let decryptedToken = this.cryptoService.decrypt(encryptedToken);
      if (decryptedToken != null && decryptedToken != "") {
        return decryptedToken;
      } else {
        return "";
      }
    } else
      return "";
  }
  setAccessToken(value: string) {
    let encryptedToken = this.cryptoService.encrypt(value);
    localStorage.setItem("access-token", encryptedToken);
  }

  clearAccessToken() {
    this.setAccessToken("");
  }

  getTokenInfo(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  getRefreshToken(): string {
    const encryptedToken = localStorage.getItem("refresh-token");
    if (encryptedToken) {
      const decryptedToken = this.cryptoService.decrypt(encryptedToken);
      if (decryptedToken)
        return decryptedToken;
      else
        return "";
    } else
      return "";
  }

  setRefreshToken(value: string) {
    const encryptedToken = this.cryptoService.encrypt(value);
    localStorage.setItem("refresh-token", encryptedToken);
  }

  getAuthorities(): string[] | null {
    const authoritiesStrEncrypted = localStorage.getItem("authorities");
    if (authoritiesStrEncrypted) {
      const authoritiesStr = this.cryptoService.decrypt(authoritiesStrEncrypted);
      if (authoritiesStr)
        return JSON.parse(authoritiesStr);
      else
        return null;
    } else {
      return null;
    }
  }

  setAuthorities(authorities: string[]) {
    const authoritiesStr = JSON.stringify(authorities);
    const authoritiesStrEncrypted = this.cryptoService.encrypt(authoritiesStr);
    localStorage.setItem("authorities", authoritiesStrEncrypted);
  }

  clearRefeshToken() {
    this.setRefreshToken("");
  }

  get user(): AuthUser | null {
    const tokenInfo = this.tokenInfo;
    if (tokenInfo)
      return new AuthUser(tokenInfo);
    else
      return null;
  }

  get isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken)
      return false;

    const accessTokenInfo = this.getTokenInfo(accessToken);
    if (!accessTokenInfo)
      return false;

    var currentTime = Math.floor(new Date().getTime() / 1000);
    if (accessTokenInfo.exp < currentTime) {
      return false;
    } else {
      return true;
    }
  }

  get isTokenExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken)
      return false;

    const accessTokenInfo = this.getTokenInfo(accessToken);
    if (!accessTokenInfo)
      return false;

    var currentTime = Math.floor(new Date().getTime() / 1000);
    if (accessTokenInfo.exp < currentTime) {
      return true;
    } else {
      return false;
    }
  }

  get isAuthenticated$(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const accessToken = this.getAccessToken();
      if (!accessToken)
        reject();

      const accessTokenInfo = this.getTokenInfo(accessToken);
      if (!accessTokenInfo)
        reject();

      var currentTime = Math.floor(new Date().getTime() / 1000);
      if (accessTokenInfo.exp < currentTime) {
        const userId = accessTokenInfo.sub;
        reject();
      } else {
        resolve(true);
      }
    });
  }

  get tokenInfo(): any {
    return this.getTokenInfo(this.getAccessToken());
  }

  constructor(private readonly httpClient: HttpClient,
    private readonly configurationService: NoxConfigurationService,
    private readonly cryptoService: CryptoService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  register(request: RegisterRequest): Observable<RegisterResponse> {
    let url = `${this.rootUrl}/auth/register`;
    return this.httpClient.post<RegisterResponse>(url, {
      clientName: this.clientType,
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName
    }, {
      context: new HttpContext().set(NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN, true)
    })
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    let url = `${this.rootUrl}/auth/authorize`;
    return this.httpClient.post<LoginResponse>(url, {
      clientType: this.clientType,
      clientId: this.clientId,
      email: request.email,
      password: request.password
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      context: new HttpContext().set(NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN, true)
    }).pipe(map((data: any) => {
      this.setAccessToken(data.accessToken);
      this.setRefreshToken(data.refreshToken);

      if (data.authorities)
        this.setAuthorities(data.authorities);

      return data;
    }));
  }

  logout(): Observable<any> {
    if (!this.getRefreshToken())
      return of(null);

    return this.httpClient.post(this.rootUrl + '/auth/revoke', {
      clientType: this.clientType,
      clientId: this.clientId,
      refreshToken: this.getRefreshToken()
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(map((result: any) => {
      this.clearAccessToken();
      this.clearRefeshToken();

      return of(null);
    }), catchError((error: any) => {
      this.clearAccessToken();
      this.clearRefeshToken();

      return error;
    }));
  }

  renewTokens(): Observable<any> {
    const url = `${this.rootUrl}/auth/renewTokens`;
    return this.httpClient.put(url, {
      clientType: this.clientType,
      clientId: this.clientId,
      refreshToken: this.getRefreshToken()
    }, {
      context: new HttpContext().set(NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN, true)
    });
  }

  changePassword(request: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    let url = `${this.rootUrl}/auth/changePassword`;
    return this.httpClient.put<ChangePasswordResponse>(url, {
      userId: request.userId,
      oldPassword: request.oldPassword,
      newPassword: request.newPassword
    });
  }

  mailConfirmation(request: MailConfirmationRequest): Observable<MailConfirmationResponse> {
    let url = `${this.rootUrl}/auth/mailConfirmation`;
    return this.httpClient.post<MailConfirmationResponse>(url, {
      email: request.email,
      languageShortName: request.languageShortName
    });
  }

  codeConfirmation(request: CodeConfirmationRequest): Observable<CodeConfirmationResponse> {
    let url = `${this.rootUrl}/auth/codeConfirmation`;
    return this.httpClient.post<CodeConfirmationResponse>(url, {
      username: request.username,
      confirmationCode: request.confirmationCode
    });
  }

  resetPassword(request: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    let url = `${this.rootUrl}/auth/resetPassword`;
    return this.httpClient.put<ResetPasswordResponse>(url, {
      username: request.username,
      newPassword: request.newPassword
    });
  }

  userResetPassword(request: UserResetPasswordRequest): Observable<UserResetPasswordResponse> {
    let url = `${this.rootUrl}/auth/reset-user-password`;
    return this.httpClient.put<UserResetPasswordResponse>(url, {
      username: request.username
    });
  }

  resetPasswordByUser(request: ResetPasswordByUserRequest): Observable<ResetPasswordByUserResponse> {
    let url = `${this.rootUrl}/auth/reset-password-by-user`;
    return this.httpClient.post<ResetPasswordByUserResponse>(url, {
      userId: request.userId,
      newPassword: request.newPassword
    }, {
      headers: new HttpHeaders({
        "nonsecure": "true"
      })
    });
  }

  redirectToLoginPage(redirectReason: string = "") {
    let queryParams: any = {};

    if (redirectReason)
      queryParams["redirectReason"] = redirectReason;

    this.router.navigate([this.loginUrl], {
      queryParams: queryParams,
      queryParamsHandling: "merge"
    });
  }

  redirectToHomePage() {
    this.router.navigate(["/"]);
  }

  redirectToUnauthorizedPage() {
    this.router.navigate([this.unauthorizedUrl], {
      queryParams: {
        destinationUrl: this.activatedRoute.url
      }
    });
  }

  getTimeZone(): number {
    if (this.tokenInfo && this.tokenInfo["time_zone"])
      return parseInt(this.tokenInfo["time_zone"]) * 60;
    else
      return DateTime.now().offset;
  }

  hasRole(roleName: string): boolean {
    const user = this.user;
    if (user && user.roles) {
      for (let i = 0; i < user.roles.length; i++) {
        const role = user.roles[i];
        if (role.name == roleName)
          return true;
      }
    }

    return false;
  }

  hasAuthority(authorityName: string): boolean {
    const authorities = this.getAuthorities();
    if (authorities) {
      return authorities.indexOf(authorityName) != -1;
    } else {
      return false;
    }
  }
}