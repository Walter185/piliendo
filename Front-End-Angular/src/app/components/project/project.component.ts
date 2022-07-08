import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Project } from '../../model/project.model';
import { ProjectService } from '../../_services/project.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects:Project[]=[];
  public editProject:Project | undefined;
  public deleteProject:Project | undefined;
  currentUser: any;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  ShowUserBoard = false;
  showModeratorBoard = false;
  username: string;


  constructor(private projectService:ProjectService, private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void {
    this.getProjects();
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
  public getProjects():void{
    this.projectService.getProject().subscribe({
      next:(Response:Project[])=>{
       this.projects=Response;
      },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    },
  });
  }
  public onOpenModal(mode:String, project?:Project):void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addProjectModal');
    } else if(mode==='delete'){
      this.deleteProject=project;
      button.setAttribute('data-target','#deleteProjectModal');
    } else if (mode==='edit'){
      this.editProject=project;
      button.setAttribute('data-target','#editProjectModal');
    }
    container?.appendChild(button);
    button.click();
    }

    public onAddProject(addForm:NgForm):void{
      document.getElementById('add-project-form')?.click();
      this.projectService.addProject(addForm.value).subscribe({
        next:(response:Project) =>{
          console.log(response);
          this.getProjects();
          addForm.reset();
        },
        error:(error:HttpErrorResponse)=>{
          alert(error.message);
          addForm.reset();
        }
      })
    }
  
  public onUpdateProject(project:Project){
    this.editProject=project;
    document.getElementById('add-project-form')?.click();
    this.projectService.updateProject(project).subscribe({
      next: ( response: Project) =>{
        console.log(response);
        this.getProjects();
       },
       error:(error:HttpErrorResponse)=>{
         alert(error.message);
       }
    })
  }

  public onDeleteProject(idPro: number):void{
    this.projectService.deleteProject(idPro).subscribe({
    next: (response:void)=>{
        console.log(response);
        this.getProjects();
       },
       error:(error:HttpErrorResponse)=>{
      alert(error.message);
       }
     })
  }
}
