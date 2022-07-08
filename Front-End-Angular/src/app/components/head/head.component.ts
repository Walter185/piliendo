import { Component, OnInit } from '@angular/core';
import { Persona } from '../../model/persona.model';
import { PersonaService } from 'src/app/_services/persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  public persona:Persona | undefined;
  public editPersona:Persona | undefined;
  public deletePersona:Persona | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  showModeratorBoard = false;
  username: string;

  constructor(private personaService:PersonaService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getPersonas();
    this.currentUser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.ShowUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }
    public getPersonas():void{ 
    this.personaService.getPersona().subscribe({
      next:(Response:Persona)=>{
      this.persona=Response;
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    },
    });
  }
  public onOpenModal(mode:String, persona?:Persona):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addPersonaModal');
    } else if (mode==='edit'){
      this.editPersona=this.persona;
      button.setAttribute('data-target','#editPersonaModal');
    }
    container?.appendChild(button);
    button.click();
    }

public onUpdatePersona(persona:Persona){
this.editPersona=persona;
document.getElementById('add-persona-form')?.click();
this.personaService.updatePersona(persona).subscribe({
  next: ( response: Persona) =>{
    console.log(response);
    this.getPersonas();
   },
   error:(error:HttpErrorResponse)=>{
     alert(error.message);
   }
  })
}
   
public onAddUser(addForm:NgForm):void{
  document.getElementById('add-user-form')?.click();
  this.personaService.addPersona(addForm.value).subscribe({
    next:(response: Persona) =>{
      console.log(response);
      this.getPersonas();
      addForm.reset();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
    }
})
}

}

