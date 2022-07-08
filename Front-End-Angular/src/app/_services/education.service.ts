import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../model/education.model';


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiServeUrl='http://localhost:8080';
  
  constructor(private http:HttpClient) { }

public getEducation():Observable<Education[]>{
  return this.http.get<Education[]>(`${this.apiServeUrl}/educacion/all`);
}

public addEducation(education: Education): Observable<Education>{
  return this.http.post<Education>(`${this.apiServeUrl}/educacion/add`,education);
}
public updateEducation(education: Education): Observable<Education>{
  return this.http.put<Education>(`${this.apiServeUrl}/educacion/update`,education);
}
public deleteEducation(educationId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiServeUrl}/educacion/delete/${educationId}`);
} 
}