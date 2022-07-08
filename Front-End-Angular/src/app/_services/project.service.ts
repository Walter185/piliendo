import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiServeUrl='http://localhost:8080';
  
  constructor(private http:HttpClient) { }

public getProject():Observable<Project[]>{
  return this.http.get<Project[]>(`${this.apiServeUrl}/proyectos/all`);
}

public addProject(project: Project): Observable<Project>{
  return this.http.post<Project>(`${this.apiServeUrl}/proyectos/add`,project);
}
public updateProject(project: Project): Observable<Project>{
  return this.http.put<Project>(`${this.apiServeUrl}/proyectos/update`,project);
}
public deleteProject(projectId: number): Observable<void>{
  return this.http.delete<void>(`${this.apiServeUrl}/proyectos/delete/${projectId}`);
} 
}