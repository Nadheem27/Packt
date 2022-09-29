import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { BooksAddComponent } from './books/books-add/books-add.component';
import { BooksEditComponent } from './books/books-edit/books-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
    declarations: [
        AdminComponent,
        LoginComponent,
        BooksComponent,
        BooksAddComponent,
        BooksEditComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        NgbModule
    ]
})
export class AdminModule { }
