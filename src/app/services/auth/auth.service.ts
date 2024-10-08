import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { SigninRequestDTO } from 'src/app/models/dto/auth/SigninRequestDTO';
import { SigninResponseDTO } from 'src/app/models/dto/auth/SigninResponseDTO';
import { CustomDialogService } from 'src/app/shared/services/custom-dialog/custom-dialog.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.API_URL;

  public constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private messageService: MessageService,
    private customDialogService: CustomDialogService,
  ) {}

  public signin(signin: SigninRequestDTO): Observable<SigninResponseDTO> {
    this.cookieService.deleteAll();
    return this.httpClient.post<SigninResponseDTO>(`${this.API_URL}/auth/signin`, signin, {
      withCredentials: true,
    });
  }

  public refreshAccessToken(): Observable<SigninResponseDTO> {
    return this.httpClient.put<SigninResponseDTO>(`${this.API_URL}/auth/refresh-token`, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.cookieService.get('_refreshToken')}`,
      }),
    });
  }

  public isLoggedIn(): boolean {
    return !!this.cookieService.get('_refreshToken');
  }

  public logout(sessionExpired?: boolean): void {
    if (sessionExpired) {
      this.messageService.clear();
      this.messageService.add({
        key: 'warn-session-expired',
        severity: 'warn',
        summary: 'Warn',
        detail: 'Your session has expired, please log in again to continue!',
        life: 6000,
      });
    }
    this.cookieService.deleteAll();
    this.customDialogService.closeAll();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
