import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona.model';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiServeUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  public getPersona():Observable<Persona>{
    return this.http.get<Persona>(`${this.apiServeUrl}/persona/id/1`); 
  }
  public addPersona(persona:Persona):Observable<Persona>{
    return this.http.post<Persona>(`${this.apiServeUrl}/persona/add`,persona);
  }
  public updatePersona(persona:Persona):Observable<Persona>{
    return this.http.put<Persona>(`${this.apiServeUrl}/persona/update`,persona);
  }
  public deletePersona(personaId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServeUrl}/persona/delete/${personaId}`);
  }   
}
