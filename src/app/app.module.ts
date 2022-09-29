import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './includes/interceptor/api.interceptor';
import { AuthGuard } from './includes/guard/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }, AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
