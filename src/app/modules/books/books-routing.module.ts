import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksComponent } from './books.component';

const routes: Routes = [
    {
        path: '', component: BooksComponent,
        children: [
            { path: '', component: BooksListComponent },
            { path: 'detail/:slug', component: BookDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BooksRoutingModule { }
