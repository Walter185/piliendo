import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../model/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiServeUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

public getExperience():Observable<Experience[]>{
  return this.http.get<Experience[]>(`${this.apiServeUrl}/experiencia/all`);
}

public addExperience(experience: Experience): Observable<Experience>{
  return this.http.post<Experience>(`${this.apiServeUrl}/experiencia/add`,experience);
}
public updateExperience(experience: Experience): Observable<Experience>{
  return this.http.put<Experience>(`${this.apiServeUrl}/experiencia/update`,experience);
}
public deleteExperience(experienceId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiServeUrl}/experiencia/delete/${experienceId}`);
} 
}
