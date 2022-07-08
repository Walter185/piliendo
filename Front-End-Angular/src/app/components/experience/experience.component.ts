import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Experience } from '../../model/experience.model'
import { ExperienceService } from '../../_services/experience.service'
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  public experiences:Experience[]=[];
  public editExperience:Experience | undefined;
  public deleteExperience:Experience | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  showModeratorBoard = false;
  username: string;


  constructor(private experienceService:ExperienceService, private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.getExperiences();
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
  public getExperiences():void{
    this.experienceService.getExperience().subscribe({
      next:(Response:Experience[])=>{
       this.experiences=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    },
  });
  }
  public onOpenModal(mode:String, experience?:Experience):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addExperienceModal');
    } else if(mode==='delete'){
      this.deleteExperience=experience;
      button.setAttribute('data-target','#deleteExperienceModal');
    } else if (mode==='edit'){
      this.editExperience=experience;
      button.setAttribute('data-target','#editExperienceModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddExperience(addForm:NgForm):void{
      document.getElementById('add-experience-form')?.click();
      this.experienceService.addExperience(addForm.value).subscribe({
        next:(response:Experience) =>{
          console.log(response);
          this.getExperiences();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateExperience(experience:Experience){
    this.editExperience=experience;
    document.getElementById('add-experience-form')?.click();
    this.experienceService.updateExperience(experience).subscribe({
      next: ( response: Experience) =>{
        console.log(response);
        this.getExperiences();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteExperience(idExp: number):void{
    this.experienceService.deleteExperience(idExp).subscribe({
    next: (response:void)=>{
        console.log(response);
        this.getExperiences();
       },
       error:(error:HttpErrorResponse)=>{
      alert(error.message);
       }
     })
  }
}
