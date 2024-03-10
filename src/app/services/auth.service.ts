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

    return this.http.post(baseURL + "Auth/login", loginObj, {})
  }

  postReq(url: any, data: any): Observable<any> {
    return this.http.post(baseURL + url, data).pipe(map((response: any) => {
      return response;
    }));
  }

  postRequest(url: any, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(baseURL + url, data, { headers }).pipe(map((response: any) => {
      return response;
    }));
  }

  get(url: any, id: string) {
    return this.http.get(baseURL + url + id)
  }

  delete(url: any, id: string) {
    return this.http.delete(baseURL + url + id)
  }

  patch(url: any, data: any) {
    return this.http.patch(baseURL + url,data)
  }

  editdata(url: any, data: any) {
    return this.http.post(baseURL + url, data)
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
