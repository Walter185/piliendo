import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logro } from '../model/logro.model';

@Injectable({
  providedIn: 'root'
})
export class LogroService {
  private apiServeUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

public getLogro():Observable<Logro[]>{
  return this.http.get<Logro[]>(`${this.apiServeUrl}/logro/all`);
}

public addLogro(logro: Logro): Observable<Logro>{
  return this.http.post<Logro>(`${this.apiServeUrl}/logro/add`,logro);
}
public updateLogro(logro: Logro): Observable<Logro>{
  return this.http.put<Logro>(`${this.apiServeUrl}/logro/update`,logro);
}
public deleteLogro(logroId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiServeUrl}/logro/delete/${logroId}`);
} 
}
