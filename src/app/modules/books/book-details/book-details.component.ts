import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { ToastService } from 'src/app/includes/services/toast.service';
import { BooksService } from '../services/books.service';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

    bookData: any;
    appRoutes = appRoutes;

    constructor(
        private bookService: BooksService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToastService
    ) { }

    ngOnInit(): void {
        this.bookService.getBook(this.route.snapshot.params['slug']).subscribe((res: any) => {
            switch (res?.code) {
                case 0:
                    this.bookData = res?.data;
                    break;

                case 1:
                    this.toast.error(res?.message);
                    this.router.navigate([appRoutes.books.LIST]);
                    break;
            }
        });
    }

}
