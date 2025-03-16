import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, Route, UrlSegment, CanActivateChild, CanDeactivate, CanLoad } from '@angular/router';
import { NoxAuthService } from './nox-auth.service';
import { BehaviorSubject, Observable, catchError, filter, map, of, switchMap, take, throwError } from 'rxjs';
import { RoleName } from '../../../../app/enum/role-name';

@Injectable({
  providedIn: 'root'
})
export class NoxAuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router, private authService: NoxAuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.checkUserLogin(next, state))
      return true;

    return this.handleUnauthorizedOrExpiredError(next);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  canDeactivate(component: unknown, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated)
      return false;

    if (state.url == "" || state.url == "/" || state.url == "/manage") {
      return this.navigateByRole();
    } else {
      return true;
    }
  }

  navigateByRole(): boolean {
    if (this.authService.user?.hasRole(RoleName.systemAdministrator)) {
      this.router.navigate(["/manage/organization"]);
      return true;
    } else if (this.authService.user?.hasRole(RoleName.organizationAdministrator)) {
      this.router.navigate(["/manage/company"]);
      return true;
    } else if (this.authService.user?.hasRole(RoleName.companyAdministrator)) {
      this.router.navigate(["/manage/user"]);
      return true;
    } else if (this.authService.user?.hasRole(RoleName.student)) {
      this.router.navigate(["/user/dashboard"]);
      return true;
    } else {
      console.error("No role match for user in page guard");

      this.authService.clearAccessToken();
      this.authService.clearRefeshToken();

      this.authService.redirectToLoginPage();

      return false;
    }
  }

  handleUnauthorizedOrExpiredError(next: ActivatedRouteSnapshot): Observable<boolean> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken) {
        console.warn("refresh token requested");

        return this.authService.renewTokens().pipe(
          switchMap((result: any, index: number) => {
            this.authService.setAccessToken(result.accessToken);
            this.authService.setRefreshToken(result.refreshToken);

            this.isRefreshing = false;

            return of(this.navigateByRole());
          }),
          catchError((error) => {
            this.isRefreshing = false;

            this.authService.clearAccessToken();
            this.authService.clearRefeshToken();

            this.authService.redirectToLoginPage();

            return throwError(() => error);
          })
        );
      } else {
        this.authService.redirectToLoginPage();
        return of(false);
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1)
    );
  }
}
