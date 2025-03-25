import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {  // Changed to 'response' instead of 'isAuthenticated'
        if (response && response.token) {
          console.log('Login successful');
          localStorage.setItem('token', response.token);  // Corrected token reference
          this.router.navigate(['/address-book']);
        } else {
          console.log('Login failed: Invalid credentials');
          alert('Login failed: Invalid credentials');
        }
      },
      (error) => {
        console.log('Login failed:', error);
        alert('Login failed: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }
}
