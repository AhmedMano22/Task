
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
  standalone: true,
    imports: [AsyncPipe,CommonModule],
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public user$: Observable<any>;

    constructor(private auth: AuthenticationService) {
        this.user$ = this.auth.getOIDCUser();
    }

    ngOnInit(): void {
    }

    triggerSignout(): void {
        this.auth.signout();
    }
}