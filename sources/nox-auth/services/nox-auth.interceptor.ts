import { HttpContextToken, HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { NoxAuthService } from "./nox-auth.service";
import { inject } from "@angular/core";
import { catchError, filter, finalize, Observable, Subject, switchMap, take, throwError } from "rxjs";
import { NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN } from "./nox-auth.interceptor.shared";

export const HTTP_CLIENT_INSECURE_REQUEST = new HttpContextToken<boolean>(() => false);

let isRefreshingToken: boolean = false;
let tokenSubject: Subject<any> = new Subject();

export function noxAuthInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    if (request.context.has(NOX_HTTP_CLIENT_REQUEST_WITHOUT_ACCESS_TOKEN)) {
        return next(request.clone());
    }

    const authService = inject(NoxAuthService);

    // inject bearer token into request header
    const accessToken = authService.getAccessToken();

    if (authService.isTokenExpired) {
        return renewTokens(request, next, authService);
    }

    return next(request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    })).pipe(catchError(error => {
        console.error("request error", error.status);
        if (error.status === 401) {
            console.error("unauthorized request 401");
            return renewTokens(request, next, authService);
        }

        return throwError(() => error);
    }));
}

export function renewTokens(request: HttpRequest<any>, next: HttpHandlerFn, authService: NoxAuthService): Observable<any> {
    if (!isRefreshingToken) {
        isRefreshingToken = true;

        // notify all waiting requests that the token is being refreshed
        tokenSubject.next(null);

        console.info("renewing tokens...");
        return authService.renewTokens().pipe(
            switchMap((result: any) => {
                if (result) {
                    tokenSubject.next(result);

                    console.info("tokens renewed!");

                    console.warn("access token", result.accessToken);
                    console.warn("refresh token", result.refreshToken);

                    authService.setAccessToken(result.accessToken);
                    authService.setRefreshToken(result.refreshToken);

                    // retry the original request with the new token
                    return next(addToken(request, result.accessToken));
                }

                // if token refresh fails, log out the user
                return authService.logout().pipe(switchMap((result: any) => {
                    authService.redirectToLoginPage();
                    return next(request);
                }), catchError((error: HttpErrorResponse) => {
                    throw throwError(() => error);
                }));
            }), catchError((error: HttpErrorResponse) => {
                authService.redirectToLoginPage();
                return next(request);
            }),
            finalize(() => {
                isRefreshingToken = false; // reset the flag
            })
        );
    } else {
        // queue requests while a token is being refreshed
        return tokenSubject.pipe(
            filter((token: string) => token != null),
            take(1),
            switchMap((token: string) => {
                return next(addToken(request, token));
            }));
    }
}

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
        setHeaders: {
            "Authorization": `Bearer ${token}`
        },
    });
}