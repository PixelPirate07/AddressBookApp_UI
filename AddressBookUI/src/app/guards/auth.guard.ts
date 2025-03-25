import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { responseType: 'text' }).pipe(
      map(response => {
        console.log('Login response:', response);
        if (response) {
          localStorage.setItem('token', response);
          return true;
        }
        return false;
      })
    );
  }

  signUp(userData: { name: string; email: string; password: string; role: string }): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/register`, userData, { responseType: 'text' }).pipe(
      map(response => {
        console.log('Sign Up response:', response);
        return response === "User Registered Successfully!";
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
