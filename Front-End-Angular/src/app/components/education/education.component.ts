import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Education } from '../../model/education.model'
import { EducationService } from '../../_services/education.service'

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public educations:Education[]=[];
  public editEducation:Education | undefined;
  public deleteEducation:Education | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  showModeratorBoard = false;
  username: string;


  constructor(private educationService:EducationService, private tokenStorageService:TokenStorageService) { }
  
  ngOnInit(): void {
    this.getEducations();
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
  public getEducations():void{
    this.educationService.getEducation().subscribe({
      next:(Response:Education[])=>{
       this.educations=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
  }
  public onOpenModal(mode:String, education?:Education):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addEducationModal');
    } else if(mode==='delete'){
      this.deleteEducation=education;
      button.setAttribute('data-target','#deleteEducationModal');
    } else if (mode==='edit'){
      this.editEducation=education;
      button.setAttribute('data-target','#editEducationModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddEducation(addForm:NgForm):void{
      document.getElementById('add-education-form')?.click();
      this.educationService.addEducation(addForm.value).subscribe({
        next:(response:Education) =>{
          console.log(response);
          this.getEducations();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateEducation(education:Education){
    this.editEducation=education;
    document.getElementById('add-education-form')?.click();
    this.educationService.updateEducation(education).subscribe({
      next: ( response: Education) =>{
        console.log(response);
        this.getEducations();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteEducation(idEdu: number):void{
    this.educationService.deleteEducation(idEdu).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getEducations();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }
}

