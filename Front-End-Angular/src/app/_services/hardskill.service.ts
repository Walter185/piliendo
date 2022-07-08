import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hardskill } from '../model/hardskill.model';
@Injectable({
  providedIn: 'root'
})
export class HardskillService {
  private apiServeUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  public getHardskill():Observable<Hardskill[]>{
    return this.http.get<Hardskill[]>(`${this.apiServeUrl}/hardskills/all`);
  }
  
  public addHardskill(hardskill: Hardskill): Observable<Hardskill>{
    return this.http.post<Hardskill>(`${this.apiServeUrl}/hardskills/add`,hardskill);
  }
  public updateHardskill(hardskill: Hardskill): Observable<Hardskill>{
    return this.http.put<Hardskill>(`${this.apiServeUrl}/hardskills/update`,hardskill);
  }
  public deleteHardskill(hardskillId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServeUrl}/hardskills/delete/${hardskillId}`);
  } 
  }
