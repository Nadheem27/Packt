import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { CommonService } from 'src/app/includes/services/common.service';
import { ToastService } from 'src/app/includes/services/toast.service';
import { BooksService } from '../../services/books.service';

@Component({
    selector: 'app-books-add',
    templateUrl: './books-add.component.html',
    styleUrls: ['./books-add.component.css']
})
export class BooksAddComponent implements OnInit {

    @ViewChild('imageModal') imageModal: any;
    imageUrl: any = '';
    addForm: FormGroup;
    addFormSubmit: boolean = false;
    validation: boolean = false;
    validationMessage: any;
    appRoutes = appRoutes;
    
    constructor(
        private commonService: CommonService,
        private bookService: BooksService,
        private toast: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.addForm = this.fb.group({
            title: ['', Validators.required],
            authorName: ['', [Validators.required]],
            genre: ['', Validators.required],
            description: ['', Validators.required],
            isbn: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
            image: ['', Validators.required],
            publishedDate: ['', Validators.required],
            publisherName: ['', Validators.required],
            status: ['1', Validators.required]
        });
     }

    ngOnInit(): void {
    }

    store() {
        this.addFormSubmit = true;
        this.validation = false;

        if (!this.addForm.valid)
            return false;

        const formData = new FormData();

        for (const data of Object.keys(this.addForm.value)) {
            formData.append(this.commonService.camelToSnake(data), this.addForm.value[data]);
        }

        this.bookService.storeBook(formData).subscribe((res:any) => {
            switch(res?.code) {
                case 3:
                    this.validation = true;
                    this.validationMessage = res?.data;
                    this.toast.error(res?.message);
                    break;

                case 0:
                    this.toast.success(res?.message);
                    this.router.navigate([appRoutes.admin.books.LIST]);
                    break;
            }
        });
    }

    loadImage(event): any {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]);
            reader.onloadend = (e) => {
                this.imageUrl = e.target['result'];
            };

            this.addForm.patchValue({
                image: event.target.files[0]
            });
        }
    }

    openImage() {
        this.modalService.open(this.imageModal, { ariaLabelledBy: 'image-modal', size: 'sm' });
    }

    feildInvalidCheck(field: string): any {
        if (this.addForm.valid)
            return false;

        if (this.addForm.get(field)?.valid) {
            return false;
        }

        return (
            (!this.addForm.get(field)!.valid && this.addForm.get(field)!.touched) ||
            (this.addForm.get(field)!.untouched && this.addFormSubmit)
        );
    }

}
