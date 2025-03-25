import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private BASE_URL = 'http://localhost:8080/addressbook';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (!token) {
      console.error('Token is missing. Please log in again.');
      alert('Session expired. Please log in again.');
      window.location.href = '/login'; // Redirect to login page if token is missing
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Add the token to the Authorization header
    });
  }

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/all`, { headers: this.getHeaders() });
  }

  addContact(person: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/add`, person, { headers: this.getHeaders() });
  }

  updateContact(id: number, person: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}/update/${id}`, person, { headers: this.getHeaders() });
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/delete/${id}`, { headers: this.getHeaders() });
  }
}
