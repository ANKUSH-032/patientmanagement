import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const baseURL = environment.api_url
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(loginObj: any) {

    return this.http.post(environment.api_url + "Auth/login", loginObj, {})
  }

  postReq(url: any,data: any): Observable<any> {
 

    return this.http.post(baseURL + url, data).pipe(map((response: any) => {
     // setTimeout(() => this.spinner.hide(), 500)
      return response;
    }));
  }
  postRequest(url: any, data: any): Observable<any> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // Create headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    // Include Authorization header if token is available
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Include headers in the request
    return this.http.post(baseURL + url, data, { headers }).pipe(map((response: any) => {
      return response;
    }));
  }
  private isAuthenticated: boolean = false;

  // Setter to update authentication state
  setAuthentication(value: boolean): void {
    this.isAuthenticated = value;
  }

  // Getter to check authentication state
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
