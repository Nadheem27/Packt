import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { localStorageVariables } from 'src/app/config/local/variables';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { RoutingService } from '../services/routing.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    
    constructor(private router: Router, private routingService: RoutingService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.routingService.booleanCheck(localStorage.getItem(localStorageVariables.IS_LOGGED_IN))) {
            this.router.navigate([appRoutes.admin.books.LIST]);
        }

        return !this.routingService.booleanCheck(localStorage.getItem(localStorageVariables.IS_LOGGED_IN));
    }

}
