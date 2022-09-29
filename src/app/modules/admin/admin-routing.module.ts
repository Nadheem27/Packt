import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/includes/guard/auth.guard';
import { LoginGuard } from 'src/app/includes/guard/login.guard';
import { AdminComponent } from './admin.component';
import { BooksAddComponent } from './books/books-add/books-add.component';
import { BooksEditComponent } from './books/books-edit/books-edit.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'books', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
            { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
            { path: 'books/add', component: BooksAddComponent, canActivate: [AuthGuard] },
            { path: 'books/edit/:id', component: BooksEditComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
