
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthenticationService } from '../../../core/services/authentication.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {


  public hasValidAccessToken = false;
    constructor(public auth: AuthenticationService,
        private oauthService: OAuthService,
    ) {
        this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
    }

    tiggerAuthentication(): void {
        this.auth.authenticate();
    }
}