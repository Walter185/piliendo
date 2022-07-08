import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Softskill } from '../model/softskill.model';

@Injectable({
  providedIn: 'root'
})
export class SoftskillService {
  private apiServeUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  public getSoftskill():Observable<Softskill[]>{
    return this.http.get<Softskill[]>(`${this.apiServeUrl}/softskills/all`);
  }
  
  public addSoftskill(softskill: Softskill): Observable<Softskill>{
    return this.http.post<Softskill>(`${this.apiServeUrl}/softskills/add`,softskill);
  }
  public updateSoftskill(softskill: Softskill): Observable<Softskill>{
    return this.http.put<Softskill>(`${this.apiServeUrl}/softskills/update`,softskill);
  }
  public deleteSoftskill(softskillId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServeUrl}/softskills/delete/${softskillId}`);
  } 
  }

