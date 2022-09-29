import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { RoutingService } from '../services/routing.service';
import { catchError, tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { localStorageVariables } from 'src/app/config/local/variables';
import { appRoutes } from 'src/app/config/routes/app.routes';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    country: any = '';

    constructor(
        private routingService: RoutingService,
        private toastService: ToastService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
        let token: any = '';

        if (this.routingService.booleanCheck(localStorage.getItem(localStorageVariables.IS_LOGGED_IN))) {
            if (localStorage.getItem(localStorageVariables.ACCESS_TOKEN)) {
                token = localStorage.getItem(localStorageVariables.ACCESS_TOKEN);
            }
        }

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request).pipe(
            tap((evt) => {
                if (evt instanceof HttpResponse) {
                    return of(evt);
                }
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 400:
                            return throwError(() => err);
                        case 401:
                            this.toastService.error('Session Expired');
                            this.routingService.clearData();
                            this.router.navigate([appRoutes.admin.LOGIN]);
                            break;
                        case 403:
                            this.routingService.clearData();
                            this.router.navigate([appRoutes.admin.LOGIN]);
                            break;
                        case 422:
                            return throwError(() => err);
                        default:
                            return throwError(() => err);
                    }
                } else {
                    return throwError(() => err);
                }
            })
        );
    }
}
