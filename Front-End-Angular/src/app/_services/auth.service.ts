import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServeUrl='http://localhost:8080';
  public redirectUrl: string;
  router: any;
  loggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    if(this.hasToken()){
      this.setLoggedIn(true);
    } else {
      this.setLoggedIn(false);
      
    } 
   }

  login(credentials): Observable<any> {
    return this.http.post(`${this.apiServeUrl}/api/auth/signin`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(`${this.apiServeUrl}/api/auth/signup`, {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  hasToken(): boolean{
    if (localStorage.getItem('token')){
      return true;
    } else {
      return false;
    }
  }
  setLoggedIn(value: boolean){
    this.loggedIn$.next(value);
  }
}
