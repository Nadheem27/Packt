import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { CommonService } from 'src/app/includes/services/common.service';
import { ToastService } from 'src/app/includes/services/toast.service';
import { BooksService } from '../../services/books.service';

@Component({
    selector: 'app-books-edit',
    templateUrl: './books-edit.component.html',
    styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {

    @ViewChild('imageModal') imageModal: any;
    bookData:any;
    editForm: FormGroup;
    editFormSubmit: boolean = false;
    validation: boolean = false;
    validationMessage: any;
    appRoutes = appRoutes;
    
    constructor(
        private commonService: CommonService,
        private bookService: BooksService,
        private toast: ToastService,
        private modalService: NgbModal,
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.editForm = this.fb.group({
            id: [''],
            title: ['', Validators.required],
            authorName: ['', [Validators.required]],
            genre: ['', Validators.required],
            description: ['', Validators.required],
            isbn: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
            image: [''],
            publishedDate: ['', Validators.required],
            publisherName: ['', Validators.required],
            status: ['1', Validators.required]
        });
     }

    ngOnInit(): void {
        this.bookService.getBook(this.route.snapshot.params['id']).subscribe((res: any) => {
            switch (res?.code) {
                case 0:
                    this.bookData = res?.data;
                    this.setFormData(res?.data);
                    break;

                case 1:
                    this.toast.error(res?.message);
                    this.router.navigate([appRoutes.admin.books.LIST]);
                    break;
            }
        });
    }

    setFormData(data) {
        this.editForm.patchValue({
            id: data.id,
            title: data.title,
            authorName: data.author_name,
            genre: data.genre,
            description: data.description,
            isbn: data.isbn,
            publishedDate: data.published_date,
            publisherName: data.publisher_name,
            status: data.status
        });
    }

    update() {
        this.editFormSubmit = true;
        this.validation = false;

        if (!this.editForm.valid)
            return false;

        const formData = new FormData();
        
        for (const data of Object.keys(this.editForm.value)) {
            formData.append(this.commonService.camelToSnake(data), this.editForm.value[data]);
        }

        this.bookService.updateBook(formData).subscribe((res:any) => {
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
                this.bookData.image = e.target['result'];
            };

            this.editForm.patchValue({
                image: event.target.files[0]
            });
        }
    }

    feildInvalidCheck(field: string): any {
        if (this.editForm.valid)
            return false;

        if (this.editForm.get(field)?.valid) {
            return false;
        }

        return (
            (!this.editForm.get(field)!.valid && this.editForm.get(field)!.touched) ||
            (this.editForm.get(field)!.untouched && this.editFormSubmit)
        );
    }

    openImage() {
        this.modalService.open(this.imageModal, { ariaLabelledBy: 'image-modal', size: 'sm' });
    }

}
