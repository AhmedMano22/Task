import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';
import { catchError, from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public oauthService = inject(OAuthService);
  private router = inject(Router);

  constructor() {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        this.router.navigate(['/home']);
      }
    });
  }
   public getOIDCUser(): Observable<any> {
    return from(this.oauthService.loadUserProfile()).pipe(
      catchError(error => {
        console.error('Error loading user profile:', error);
        return of(null); // Return null Observable on error
      })
    );
  }
  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }

  getUserProfile2() {
    return this.oauthService.getIdentityClaims();
  }

  getUserProfile(): Observable<any> { // Update return type
    return of(this.oauthService.getIdentityClaims()); // Wrap in Observable
  }
  hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }
}
