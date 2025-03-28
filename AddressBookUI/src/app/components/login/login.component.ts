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
      (response) => {
        if (response) {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.toString()); // Save the token in localStorage
          this.router.navigate(['/address-book']); // Navigate to the address book page
        } else {
          console.log('Login failed: Invalid credentials');
          alert('Login failed: Invalid credentials');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.error?.message || 'Unknown error'));
      }
    );
  }
}
