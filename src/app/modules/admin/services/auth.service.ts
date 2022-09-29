import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutingService } from 'src/app/includes/services/routing.service';
import { authEndpoints } from 'src/app/config/endpoints/api.endpoints';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public http: HttpClient,
        public routingService: RoutingService
    ) { }

    login(data: any) {
        const url = this.routingService.getApiUrl(authEndpoints.LOGIN);
        return this.http.post(url, data);
    }

    logout() {
        const url = this.routingService.getApiUrl(authEndpoints.LOGOUT);
        return this.http.get(url);
    }
}
