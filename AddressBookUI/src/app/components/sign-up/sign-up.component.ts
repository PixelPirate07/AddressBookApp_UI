import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth.guard';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.signUp(userData).subscribe(
      success => {
        if (success) {
          console.log('Sign Up successful');
          alert('Sign Up successful');
          this.router.navigate(['/login']);
        } else {
          console.log('Sign Up failed: No success message received');
          alert('Sign Up failed');
        }
      },
      error => {
        console.log('Sign Up failed:', error);
        alert('Sign Up failed');
      }
    );
  }
}
