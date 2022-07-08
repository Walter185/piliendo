import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intro } from '../model/intro.model';

@Injectable({
  providedIn: 'root'
})
export class IntroService {
  private apiServeUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  public getIntro():Observable<Intro[]>{
    return this.http.get<Intro[]>(`${this.apiServeUrl}/introduccion/all`);
  }
  public addIntro(intro: Intro): Observable<Intro>{
  return this.http.post<Intro>(`${this.apiServeUrl}/introduccion/add`,intro);
  }
  public updateIntro(intro:Intro):Observable<Intro>{
    return this.http.put<Intro>(`${this.apiServeUrl}/introduccion/update`,intro);
  }
  public deleteIntro(introId: number): Observable<void>{
 return this.http.delete<void>(`${this.apiServeUrl}/introduccion/delete/${introId}`);
 } 
}
