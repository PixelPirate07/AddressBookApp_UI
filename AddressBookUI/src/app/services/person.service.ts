import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private BASE_URL = 'http://localhost:8080/addressbook';

  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error('Token is missing. Redirecting to login.');
      alert('Session expired. Please log in again.');
      this.router.navigate(['/login']); // Redirect to login page if token is missing
      throw new Error('Token missing.'); // Block the request if the token is missing
    }
    console.log('Auth Header:', `Bearer ${token}`); // Debugging: Log the token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
      'Content-Type': 'application/json' // Ensure Content-Type is set
    });
  }

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/all`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  addContact(person: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/add`, person, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateContact(id: number, person: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/update/${id}`, person, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/delete/${id}`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    if (error.status === 401) {
      alert('Unauthorized access. Redirecting to login.');
      this.router.navigate(['/login']);
    } else {
      alert('An error occurred. Please try again.');
    }
    return throwError(() => new Error('Something went wrong.'));
  }
}
