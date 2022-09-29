import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appRoutes } from 'src/app/config/routes/app.routes';
import { RoutingService } from 'src/app/includes/services/routing.service';
import { ToastService } from 'src/app/includes/services/toast.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    appRoutes = appRoutes;

    constructor(
        private authService: AuthService,
        private routingService: RoutingService,
        private router:Router,
        private toast: ToastService,
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.authService.logout().subscribe((res:any) => {
            switch(res?.code) {
                case 0:
                    this.routingService.clearData();
                    this.toast.success(res?.message);
                    this.router.navigate([appRoutes.admin.LOGIN]);
                    break;
            }
        })
    }

}
