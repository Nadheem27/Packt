import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { RoutingService } from 'src/app/includes/services/routing.service';
import { ToastService } from 'src/app/includes/services/toast.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    returnPath: string;
    loginSubmit: boolean = false;
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toast: ToastService,
        private routingService: RoutingService,
        private route: ActivatedRoute
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.returnPath = this.route.snapshot.queryParams?.['redirectTo'] || appRoutes.admin.books.LIST;
    }

    ngOnInit(): void {
    }

    login(): any {
        this.loginSubmit = true;

        if (!this.loginForm.valid)
            return false;

        this.authService.login(this.loginForm.value).subscribe((res: any) => {
            switch (res?.code) {
                case 0:
                    this.routingService.setLoginData(res.data);
                    this.toast.success(res?.message);
                    this.router.navigate([this.returnPath]);
                    break;
                    
                case 1:
                    this.toast.error(res?.message);
                    break;
            }
        });
    }

    feildInvalidCheck(field: string): any {
        if (this.loginForm.valid)
            return false;

        return (
            (!this.loginForm.get(field)!.valid && this.loginForm.get(field)!.touched) ||
            (this.loginForm.get(field)!.untouched && this.loginSubmit)
        );
    }

}
