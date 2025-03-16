import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { NoxAuthService } from "./nox-auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class NoxAuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: NoxAuthService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse &&
        !request.url.includes(this.authService.loginUrl) &&
        error.status === 401) {
        return this.handleUnauthorizedError(request, next);
      }
      return throwError(error);
    }));
  }

  private handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken) {
        console.warn("refresh token requested");
        return this.authService.renewTokens().pipe(
          switchMap((result: any) => {
            this.authService.setAccessToken(result.accessToken);
            this.authService.setRefreshToken(result.refreshToken);

            request = request.clone({
              setHeaders: { Authorization: `Bearer ${result.accessToken}` }
            });

            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            this.authService.clearAccessToken();
            this.authService.clearRefeshToken();

            this.authService.redirectToLoginPage();

            return throwError(() => error);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })))
    );
  }
}
