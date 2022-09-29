import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { adminBooksEndpoints } from 'src/app/config/endpoints/api.endpoints';
import { RoutingService } from 'src/app/includes/services/routing.service';

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(public http: HttpClient, public routingService: RoutingService) { }

    getBookList(query) {
        const url = this.routingService.getApiUrl(adminBooksEndpoints.LIST);
        return this.http.post(url, query);
    }

    storeBook(data) {
        const url = this.routingService.getApiUrl(adminBooksEndpoints.STORE);
        const body = data;
        return this.http.post(url, body);
    }

    getBook(id) {
        const url = this.routingService.getApiUrl(adminBooksEndpoints.GET);
        const body = {
            id: id
        };
        return this.http.post(url, body);
    }

    updateBook(data) {
        const url = this.routingService.getApiUrl(adminBooksEndpoints.UPDATE);
        const body = data;
        return this.http.post(url, body);
    }

    deleteBook(id) {
        const url = this.routingService.getApiUrl(adminBooksEndpoints.DELETE);
        const body = {
            id: id
        };
        return this.http.post(url, body);
    }
}
