import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { booksEndPoints } from 'src/app/config/endpoints/api.endpoints';
import { RoutingService } from 'src/app/includes/services/routing.service';

@Injectable({
    providedIn: 'root'
})

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(public http: HttpClient, public routingService: RoutingService) { }

    bookList(data) {
        const url = this.routingService.getApiUrl(booksEndPoints.LIST);
        const body = data;
        return this.http.post(url, body);
    }

    getBook(id) {
        const url = this.routingService.getApiUrl(booksEndPoints.GET);
        const body = {
            id: id
        };
        return this.http.post(url, body);
    }
}
