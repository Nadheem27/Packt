import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
    { path: 'books', loadChildren: () => import('./modules/books/books.module').then(m => m.BooksModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
