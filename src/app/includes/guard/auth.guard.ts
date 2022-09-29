import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { localStorageVariables } from 'src/app/config/local/variables';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { RoutingService } from '../services/routing.service';
import { ToastService } from '../services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router:Router,
        private routingService: RoutingService,
        private toast: ToastService
    ) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.routingService.booleanCheck(localStorage.getItem(localStorageVariables.IS_LOGGED_IN))) {
            this.toast.info('Kindly do Login to proceed');
            this.router.navigate([appRoutes.admin.LOGIN], { queryParams: { redirectTo: state.url } });
        }

        return this.routingService.booleanCheck(localStorage.getItem(localStorageVariables.IS_LOGGED_IN));
    }

}
