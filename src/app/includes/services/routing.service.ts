import { Injectable } from '@angular/core';
import { apiUrls } from 'src/app/config/api/url';
import { localStorageVariables } from 'src/app/config/local/variables';

@Injectable({
    providedIn: 'root'
})
export class RoutingService {

    constructor() { }

    apiUrl = apiUrls.apiBaseUrl;
    baseUrl = apiUrls.baseUrl;
    localStorageVariables = localStorageVariables

    getApiUrl(endPoint: any) {
        return `${this.apiUrl}${endPoint}`;
    }

    setLoginData(data: any) {
        this.clearData();

        localStorage.setItem(this.localStorageVariables.IS_LOGGED_IN, 'true');
        localStorage.setItem(this.localStorageVariables.ACCESS_TOKEN, data.token);

        let userData = {
            email: data.email,
            name: data.name
        };

        localStorage.setItem(this.localStorageVariables.ADMIN_DATA, JSON.stringify(userData));
    }

    clearData() {
        localStorage.clear();
        localStorage.setItem(this.localStorageVariables.IS_LOGGED_IN, 'false');
        return true;
    }

    booleanCheck(request: any) {
        if (request === 'true')
            return true;

        if (request === 'false')
            return false;

        return request;
    }
}
