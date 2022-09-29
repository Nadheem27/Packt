import { Component, OnInit } from '@angular/core';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { BooksService } from '../services/books.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

    appRoutes = appRoutes;
    books: any[] = [];
    pagination: any[] = [];
    searchKey: any;
    startDate: any;
    endDate: any;
    searchEnter: Subject<string> = new Subject<string>();

    constructor(
        private bookService: BooksService,
        private router: Router
    ) { 
        this.searchEnter.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(model => {
            this.searchKey = model;
            this.search();
        });
    }

    ngOnInit(): void {

        const body = {
            page: 1
        };

        this.bookService.bookList(body).subscribe((res: any) => {
            switch (res?.code) {
                case 0:
                    this.books = res?.data.data;
                    this.pagination = res?.data.links;
                    break;
            }
        });
    }

    loadNextPage(data) {
        let page = this.stringReplace(data.url, '/?page=');

        const body = {
            page: page,
            search: this.searchKey,
            start: this.startDate,
            end: this.endDate
        };

        this.bookService.bookList(body).subscribe((res: any) => {
            switch (res?.code) {
                case 0:
                    this.books = res?.data.data;
                    this.pagination = res?.data.links;
                    break;
            }
        });
    }

    searchText(query) {    
        this.searchEnter.next(query);
    }

    search() {

        const body = {
            page: 1,
            search: this.searchKey,
            start: this.startDate,
            end: this.endDate
        };

        this.bookService.bookList(body).subscribe((res: any) => {
            switch (res?.code) {
                case 0:
                    this.books = res?.data.data;
                    this.pagination = res?.data.links;
                    break;
            }
        });
    }

    clear() {
        this.searchKey = null;
        this.startDate = null;
        this.endDate = null;
        this.ngOnInit();
    }

    bookDetails(id) {
        this.router.navigate([appRoutes.books.DETAILS, id]);
    }

    stringReplace(input, replace) {
        return input.replace(replace, '');
    }

    labelReplace(input) {
        if (input == '&laquo; Previous') {
            return 'Previous';
        }

        if (input == 'Next &raquo;') {
            return 'Next';
        }

        return input;
    }

}
