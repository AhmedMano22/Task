import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
   constructor(private auth: AuthenticationService) { }

    ngOnInit(): void {
    }

    triggerAuthentication(): void {
        this.auth.authenticate();
    }
}
