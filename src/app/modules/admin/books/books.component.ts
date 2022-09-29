import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { CommonService } from 'src/app/includes/services/common.service';
import { ToastService } from 'src/app/includes/services/toast.service';
import { BooksService } from '../services/books.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

    URL: string;
    appRoutes = appRoutes;
    books: any[] = [];

    @ViewChild('imageModal') imageModal: any;
    @ViewChild(DataTableDirective, { static: true })
    public dtElement: DataTableDirective;
    public dtOptions: DataTables.Settings = {};
    public dtTrigger: Subject<any> = new Subject();

    constructor(        
        private commonService: CommonService,
        private bookService: BooksService,
        private toast: ToastService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            responsive: true,
            serverSide: true,
            processing: true,
            ordering: false,
            autoWidth: false,
            searchDelay: 1000,
            searching: true,
            ajax: (dataTablesParameters: any, callback) => {
                this.bookService.getBookList(dataTablesParameters).subscribe((res: any) => {
                    switch (res?.code) {
                        case 0:
                            this.books = res?.data.data;
                            callback({
                                recordsTotal: res?.data.recordsTotal,
                                recordsFiltered: res?.data.recordsTotal,
                                data: []
                            });
                            this.commonService.dataTablesEmpty(this.books.length);
                            break;
                    }
                });
            }
        };
    }    

    openImageModal(url) {
        this.URL = url;
        this.modalService.open(this.imageModal, { ariaLabelledBy: 'image-modal', size: 'sm' });
    }

    deleteBook(id) {
        this.bookService.deleteBook(id).subscribe((res:any) => {
            switch(res?.code) {
                case 1:
                    this.toast.error(res?.message);
                    break;

                case 0:
                    this.toast.success(res?.message);
                    this.rerender();
                    break;
            }
        })
    }

    rerender(): void {        
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
}
